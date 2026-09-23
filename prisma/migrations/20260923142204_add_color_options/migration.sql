-- CreateTable
CREATE TABLE "ColorOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ColorOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorOptionValue" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "optionId" INTEGER NOT NULL,

    CONSTRAINT "ColorOptionValue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ColorOption" ADD CONSTRAINT "ColorOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorOptionValue" ADD CONSTRAINT "ColorOptionValue_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "ColorOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
