import { extendType, floatArg, nonNull, objectType, stringArg } from "nexus";
import { Context } from "../types/Context";
import { Product } from "../entities/Product";

export const PrductTypes = objectType({
    name: "Product",
    definition(t) {
        t.nonNull.string("id"),
        t.nonNull.string("name"),
        t.nonNull.float("price"),
        t.nonNull.string("flowers"),
        t.nonNull.string("images"),
        t.nonNull.string("size"),
        t.nonNull.string("material"),
        t.nonNull.string("otherinfo");
    },

})


export const ProductsQuerry = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field("products", {
            type: "Product",
            resolve(_parent, _args, context : Context, _info): Promise<Product[]> {
                // return Product.find();
                const {conn} = context
                return conn.query(`select * from product`)
            }
        });
    },
})



export const CreateProductMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("CreateProduct", {
            type: "Product",
            args: {
                name: nonNull(stringArg()),
                price: nonNull(floatArg()),
                flowers: nonNull(stringArg()),
                images: nonNull(stringArg()),
                size: nonNull(stringArg()),
                material: nonNull(stringArg()),
                otherinfo: nonNull(stringArg())
            },
            resolve(_parent, args, _context, _info): Promise<Product> {
                const { name, price, flowers, images, size, material, otherinfo } = args;

                return Product.create({ name, price, flowers, size, images, material, otherinfo }).save()
            }
        });
    },
})


