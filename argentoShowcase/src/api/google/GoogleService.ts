import { sheets } from '@googleapis/sheets';
import { drive } from '@googleapis/drive';

import { GoogleServiceAuth } from './GoogleServiceAuth';
import { assertDefined } from '@/common/assert.utils';

const SPREADSHEET_MAX_ROWS = 1000;
const SPREADSHEET_MAX_COLS = 1000;

export interface SpreadsheetCellData {
    value?: string;
}

export type FileType = 'CSV' | 'JSON';

export class GoogleService {
    private auth: GoogleServiceAuth;

    constructor({ auth }: { auth: GoogleServiceAuth }) {
        this.auth = auth;
    }

    async writeFile({ name, body, type }: { name: string; body: string, type: FileType }) {
        const file = await this.searchFile({ name });

        const { files } = drive("v3");
        const mimeType = (type == 'CSV') ? 'text/csv' : (type == 'JSON') ? 'application/json' : 'text/plain';
        if (file) {
            const fileId = file.fileId;
            console.info(`Updating file with ID ${fileId}...`)
            await files.update({
                fileId,
                media: { body, mimeType },
                auth: this.auth.auth
            });
        } else {
            console.info(`Creating file of name ${name}...`)
            await files.create({
                requestBody: { name },
                media: { body, mimeType },
                auth: this.auth.auth
            });
        }
    }

    async readFile({ name }: { name: string }): Promise<string | null> {
        const file = await this.searchFile({ name });
        if (!file) return null;

        const { files } = drive("v3");
        const fileId = file.fileId;
        console.info(`Getting contents of file with ID ${fileId}...`)
        const res = await files.get({ fileId, alt: 'media', auth: this.auth.auth });

        if (typeof res.data == 'string') {
            return res.data;
        }
        return JSON.stringify(res.data);
    }

    async getSpreadsheetValues(
        { spreadsheetId, sheetName }: { spreadsheetId?: string, sheetName: string }
    ) {
        const { spreadsheets } = sheets('v4');
        console.info(`Getting spreadsheet ${spreadsheetId}'s values...`)
        const res = await spreadsheets.values.get({
            spreadsheetId,
            range: this.toSpreadsheetRange({ sheetName }),
            auth: this.auth.auth
        });
        const rangeValues = res.data.values ?? [];
        return this.fromRangeValues(rangeValues);
    }

    async updateSpreadsheetValues(
        { data, spreadsheetId, sheetName }:
            { data: SpreadsheetCellData[][], spreadsheetId?: string, sheetName: string }
    ) {
        const { spreadsheets } = sheets('v4');
        const rangeValues = this.toRangeValues(data);
        console.info(`Updating spreadsheet ${spreadsheetId} sheet "${sheetName}" ...`);
        await spreadsheets.values.update({
            spreadsheetId,
            range: this.toSpreadsheetRange({ sheetName }),
            requestBody: {
                values: rangeValues
            },
            valueInputOption: 'USER_ENTERED',
            auth: this.auth.auth
        });
    }

    private toRangeValues(data: SpreadsheetCellData[][]): string[][] {
        return data.map(x => (
            x.map(y => y.value ?? '')
        ));
    }

    private fromRangeValues(rangeValues: string[][]): SpreadsheetCellData[][] {
        return rangeValues.map(x => {
            return x.map(y => ({
                value: y
            })) ?? [];
        });
    }

    private toSpreadsheetRange({ sheetName, rowMin, rowMax, colMin, colMax }:
        { sheetName: string, rowMin?: number, rowMax?: number, colMin?: number, colMax?: number }): string {
        return `'${sheetName}'!R${rowMin ?? 1}C${colMin ?? 1}:R${rowMax ?? SPREADSHEET_MAX_ROWS}C${colMax ?? SPREADSHEET_MAX_COLS}`
    }

    private async searchFile({ name }: { name: string }): Promise<{ fileId: string } | null> {
        const { files } = drive("v3");

        console.info(`Searching file of name ${name}...`)

        const res = await files.list({ q: `name="${name}" and trashed=false`, fields: 'files(id, name)', auth: this.auth.auth });
        if (!res.data.files || res.data.files.length === 0) return null;

        const file = res.data.files[0];
        const fileId = assertDefined(file.id);
        return { fileId };
    }
}
