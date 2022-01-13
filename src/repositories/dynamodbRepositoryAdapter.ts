import {Repository} from "./Repository";

export class DynamodbRepositoryAdapter implements Repository {
    constructor(client, table) {

    }

    async getTaskbyId(id: string){
        const tasks = await this.client.scan(params).promise();

    }
}
