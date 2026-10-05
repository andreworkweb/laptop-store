-- DropForeignKey
ALTER TABLE "CartItemOption" DROP CONSTRAINT "CartItemOption_cartItemId_fkey";

-- AddForeignKey
ALTER TABLE "CartItemOption" ADD CONSTRAINT "CartItemOption_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "CartItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
