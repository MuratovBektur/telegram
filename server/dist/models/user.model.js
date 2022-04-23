var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, Index, Length, DataType, } from "sequelize-typescript";
const maxLength = 25;
let telegram_user = class telegram_user extends Model {
    phone_number;
};
__decorate([
    Length({ min: 7, max: maxLength }),
    Index({
        type: "UNIQUE",
        unique: true,
    }),
    Column({
        type: DataType.DECIMAL(maxLength, 0),
    }),
    __metadata("design:type", Number)
], telegram_user.prototype, "phone_number", void 0);
telegram_user = __decorate([
    Table({
        freezeTableName: true,
    })
], telegram_user);
export { telegram_user };
