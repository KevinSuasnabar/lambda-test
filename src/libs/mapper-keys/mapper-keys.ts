
import * as jsonKeys from '@libs/mapper-keys/starships-keys-en-es.json';
import { MapperEnEs } from '@libs/mapper-keys/interfaces/mapperEnEs';

export const mapperKeys = (data: any) => {
    const mapper: MapperEnEs = jsonKeys['en-es'];
    const transformedData: any = {};

    Object.keys(data).forEach((originalKey) => {
        const transformedKey = mapper[originalKey] || originalKey;
        transformedData[transformedKey] = data[originalKey];
    });
    return transformedData;

}