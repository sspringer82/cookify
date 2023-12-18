/*
  Warnings:

  - Added the required column `private` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "caloriesPerPortion" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "preparationDuration" TEXT NOT NULL,
    "private" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("caloriesPerPortion", "difficulty", "id", "preparationDuration", "rating", "title") SELECT "caloriesPerPortion", "difficulty", "id", "preparationDuration", "rating", "title" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
