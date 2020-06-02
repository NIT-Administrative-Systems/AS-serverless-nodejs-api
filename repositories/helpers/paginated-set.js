class PaginatedSet {
  constructor(totalItems, pageSize, partialSet) {
    this.total_items = totalItems;
    this.page_size = pageSize;
    this.partial_set = partialSet;
  }

  get totalItems() {
    return this.total_items;
  }

  get totalPages() {
    return Math.ceil(this.total_items / this.page_size);
  }

  get partialSet() {
    return this.partial_set;
  }
}

module.exports = { PaginatedSet };
