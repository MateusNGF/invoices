-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "number_invoice" TEXT NOT NULL,
    "serie_invoice" TEXT NOT NULL DEFAULT '',
    "number_client" TEXT NOT NULL,
    "competency" TIMESTAMP(3) NOT NULL,
    "energy_electrical" TEXT NOT NULL,
    "energy_scee" TEXT NOT NULL,
    "energy_compensated" TEXT NOT NULL,
    "municipal_contribution" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "file_name" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);
