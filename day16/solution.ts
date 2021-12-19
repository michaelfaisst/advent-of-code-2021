import { getBinary } from "./common";

let bitPointer = 0;
let packetVersionSum = 0;
const binary = getBinary();

const getBits = (count: number) => {
    const slice = binary.slice(bitPointer, bitPointer + count);
    bitPointer += count;
    return slice;
};

const getBitsAsDecimal = (count: number) => {
    return parseInt(getBits(count), 2);
};

const parseLiteralValuePackage = () => {
    let isFinalGroup = false;
    let valueBinary = "";

    do {
        isFinalGroup = getBitsAsDecimal(1) === 0;
        valueBinary += getBits(4);
    } while (!isFinalGroup);

    return parseInt(valueBinary, 2);
};

const readTotalLengthOperatorPacket = () => {
    const values = [];
    const length = getBitsAsDecimal(15);
    const bitPointerTemp = bitPointer;

    while (bitPointer < bitPointerTemp + length) {
        values.push(parsePackage());
    }

    return values;
};

const readTotalPackagesOperatorPacket = () => {
    const values = [];
    const packages = getBitsAsDecimal(11);

    for (let i = 0; i < packages; i++) {
        values.push(parsePackage());
    }

    return values;
};

const calculateOperatorPackage = (packetTypeId: number, values: number[]) => {
    switch (packetTypeId) {
        case 0:
            return values.reduce((acc, value) => acc + value, 0);
        case 1:
            return values.reduce((acc, value) => acc * value, 1);
        case 2:
            return Math.min(...values);
        case 3:
            return Math.max(...values);
        case 5:
            return values[0] > values[1] ? 1 : 0;
        case 6:
            return values[0] < values[1] ? 1 : 0;
        case 7:
            return values[0] === values[1] ? 1 : 0;
        default:
            return 0;
    }
};

const parsePackage = () => {
    const packetVersion = getBitsAsDecimal(3);
    const packetTypeId = getBitsAsDecimal(3);

    packetVersionSum += packetVersion;

    if (packetTypeId === 4) {
        return parseLiteralValuePackage();
    } else {
        const lengthTypeId = getBitsAsDecimal(1);
        let values: number[] = [];

        if (lengthTypeId === 0) {
            values = readTotalLengthOperatorPacket();
        } else {
            values = readTotalPackagesOperatorPacket();
        }

        return calculateOperatorPackage(packetTypeId, values);
    }
};

const value = parsePackage();

export { packetVersionSum as result1, value as result2 };
