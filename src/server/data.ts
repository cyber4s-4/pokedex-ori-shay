export interface Data {
  name: string;
  img: string;
  height: number;
  weight: number;
  id: number;
  favorite: boolean;
  id_serial?: number;
}

/**
 * THE FUNCTION IS NOT IN USE!
 * The function update about a favorite pokemon in the JSON database.
 *
 * @param {string} idNumber - An object with the pokemon data
 */
export async function updateDataFavorite(idNumber: string, favorite: boolean) {
  // console.log(idNumber);
  // const db = await connectToAtlas('key');
  // const jsonFileColl: Collection<Data> = db.collection('json-file');

  // try {
  //   jsonFileColl.updateOne(
  //     { id: Number(idNumber) },
  //     { $set: { favorite: favorite } }
  //   );
  // } catch {
  //   console.log(`There is no pokemon with ${idNumber}`);
  // }
  console.log(`Update favorite for - ${idNumber} - ${favorite}`);
}
