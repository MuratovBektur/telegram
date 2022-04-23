import {
  Table,
  Column,
  Model,
  Index,
  Length,
  DataType,
} from "sequelize-typescript";
const maxLength = 25;
@Table({
  freezeTableName: true,
})
export class telegram_user extends Model {
  @Length({ min: 7, max: maxLength })
  @Index({
    type: "UNIQUE",
    unique: true,
  })
  @Column({
    type: DataType.DECIMAL(maxLength, 0),
  })
  phone_number: number;
}
