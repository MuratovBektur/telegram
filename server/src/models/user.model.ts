import { Table, Column, Model, Index, Length, DataType } from "sequelize-typescript";

@Table({
  freezeTableName: true,
})
export class User extends Model {
  @Length({ min: 3 })
  // @Index({
  //   type: 'UNIQUE',
  //   unique: true,
  // })
  
  // @Column({
  //   type: DataType.DECIMAL(25, 0)
  // })
  @Column
  phoneNumber:  bigint;
}
