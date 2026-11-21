export class CollectionDTO {
  constructor(raw, itemMapper) {
    this.total = raw.totalItems || 0
    this.items = (raw.member || []).map((item) => itemMapper(item))
    const view = raw.view || {}
    this.firstPage = view.first || null
    this.lastPage = view.last || null
    this.nextPage = view.next || null
    this.previousPage = view.previous || null
  }

  get hasNextPage() {
    return Boolean(this.nextPage)
  }

    get totalPages() {
    if (!this.lastPage) {
      return 1
    }
    const page = new URL(this.lastPage, 'http://localhost').searchParams.get('page')
    return Number(page) || 1
  }
  
  get hasPreviousPage() {
    return Boolean(this.previousPage)
  }
}