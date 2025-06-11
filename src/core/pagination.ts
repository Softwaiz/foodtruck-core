export class Cursor {
    requestedPageSize: number;
    requestedPage: number;
    resultCount: number;

    constructor(pageSize:number, pageIndex: number, resultCount: number = 0) {
        this.requestedPageSize = pageSize;
        this.requestedPage = pageIndex;
        this.resultCount = resultCount;
    }

    compute() {
        let page = this.requestedPage;
        if(page < 1) {
            page = 1;
        }

        let size = Math.min(this.requestedPageSize,200);
        let totalPages = Math.ceil(this.resultCount / size);

        if(totalPages > 0 && page > totalPages) {
            page = totalPages;
        }

        let offset = (page - 1) * size;

        return {
            page,
            size,
            offset,
            count: this.resultCount,
            pages: totalPages,
        }

    }

}