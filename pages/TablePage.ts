import {Page, Locator, expect} from '@playwright/test';
import { BasePage} from './BasePage';

export interface TableRowData
{
    lastName: string;
    email: string;
}
//Interface - blueprint - last name & email, pulling last name & email, text format - contract enforcement
//decoupling your data from Automation - Separating DOM scraping logic from the data model
//age column - interface make it easy to extend existing shape using keywords extends

export class TablePage extends BasePage
{
    readonly table: Locator;

    constructor(page: Page)
    {
        super(page);
        this.table = page.locator('#table1');
    }

    async goto(): Promise<void>
    {
        await this.navigate('https://the-internet.herokuapp.com/tables');
    }

    async isLoaded(): Promise<void>
    {
        await this.table.waitFor({state: 'visible'});
    }

    //get all rows from the table
    // get row count from the table
    //get each row data
    // get all rows data from the table
    //validate that a row has valid last name and email

    private getRows(): Locator{
        return this.table.locator('tbody tr'); //locator is synchronous in nature
    }

    async getRowCount(): Promise<number>
    {
        const rows = this.getRows();
        return await rows.count();
    }

    async getRowData(rowIndex: number): Promise<TableRowData>
    {
        //await tablePage.getRowData(2), indexes are row based
        //0 - first row
        //1 - second row
        //2 - third row
        const row = this.getRows().nth(rowIndex);
        const cells = row.locator('td');
        const lastName = await cells.nth(0).textContent();
        const email = await cells.nth(2).textContent();

        return {
            lastName: lastName?.trim() || '',
            email: email?.trim() || '',
        };
    }

    /**
     * Get all rows data from the table
     */
    async getAllRowsData(): Promise<TableRowData[]> {
        const rowCount = await this.getRowCount();
        const rowsData: TableRowData[] = [];

        for (let i = 0; i < rowCount; i++) {
            const data = await this.getRowData(i);
            rowsData.push(data);
            console.log(data);
        }

        return rowsData;
    }

    /**
     * Validate that a row has valid lastName and email
     */
    async validateRowData(rowData: TableRowData): Promise<void> {
        expect(rowData.lastName).toBeTruthy();
        expect(rowData.email).toMatch(/@/);
        console.log(rowData.lastName);
        console.log(rowData.email);
    }
}
//BasePage_SOLD - inheritance - TablePage - table locator - getRows - get Row Count - get Row Data - getAllRowsData - Validate Row
// data

//Responsibility                    Where?
//Locate element                  Page Object
//Click.Type/navigate             Page object
//state of the element in the page    Page Object
//behavior of element                 Page object
//business level                      Test
//table rows                         Page object
//Login - valid user should be able to log in and see the dashboard
//login page - page object knows HOW TO LOGIN
//TEST expect dashboard is visible
//count - of products to cart >1  
//PAGE OBJECT = knows HOW TO INTERACT WITH THE APPLICATION
// TEST = KNOWS WHAT BUSINESS SCENARIOS WE ARE TESTING AND WHAT SHOULD HAPPEN