declare namespace data {
  interface IClientBase<Entity, NewEntity> {
    create(data: NewEntity, t?: DBTransaction): Promise<Entity>;
    createMany(data: NewEntity[], t?: DBTransaction): Promise<Entity[]>;
    delete(where: Partial<Entity>, t?: DBTransaction): Promise<number>;
    update(
      where: Partial<Entity>,
      data: Partial<Entity>,
      t?: DBTransaction
    ): Promise<Entity[]>;
    findOne(
      where: Partial<Entity>,
      t?: DBTransaction
    ): Promise<Entity | undefined>;
    findMany(where: Partial<Entity>, t?: DBTransaction): Promise<Entity[]>;
    search(
      where: Partial<Entity>,
      pagination: Pagination,
      t?: DBTransaction
    ): Promise<SearchResults<Entity>>;
  }
}
