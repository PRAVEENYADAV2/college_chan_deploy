"use client"
import { useState } from "react";

//BubbleSort
async function BubbleSort(arr, setArr) {
    let sortedArray = [...arr];
    for (let i = 0; i < sortedArray.length - 1; i++) {
        let swapped = false;
        for (let j = 0; j < sortedArray.length - i - 1; j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swapped = true;
                setArr([...sortedArray]);


                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
        if (!swapped) break;
    }
}
//QuickSort
async function QuickSort(arr, setArr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = await partition(arr, setArr, low, high);
        await QuickSort(arr, setArr, low, pivotIndex - 1);
        await QuickSort(arr, setArr, pivotIndex + 1, high);
    }
}

async function partition(arr, setArr, low, high) {
    let pivot = arr[high];
    let k = low - 1;

    for (let i = low; i < high; i++) {
        if (arr[i] < pivot) {
            k++;
            [arr[i], arr[k]] = [arr[k], arr[i]];
            setArr([...arr]);
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }
    [arr[k + 1], arr[high]] = [arr[high], arr[k + 1]];
    setArr([...arr]);
    await new Promise(resolve => setTimeout(resolve, 300));
    return k + 1;
}

//Selection Sort
async function SelectionSort(arr, setArr, low = 0, high = arr.length - 1) {
    for (let i = 0; i < high; i++) {
        let max_i = max_element_index(arr, low, high - i);
        [arr[max_i], arr[high - i]] = [arr[high - i], arr[max_i]]
        setArr([...arr]);
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

function max_element_index(arr, low, high) {
    let max_i = low;
    for (let i = low; i <= high; i++) {
        if (arr[max_i] < arr[i]) {
            max_i = i
        }
    }
    return max_i
}




export default function Sorting() {
    const [arr, setArr] = useState([3, 4, 5, 12, 6, 1, 8, 23, 9, 4, 3, 6, 2, 4, 1, 2, 5]);

    const sortArrHandle = () => {
        BubbleSort(arr, setArr);
    }
    const sortArrHandleQuick = async () => {
        const sortedArr = [...arr];
        await QuickSort(sortedArr, setArr);
    }
    const sortArrHandleSelectionSort = async () => {
        const copyArr = [...arr];
        await SelectionSort(arr, setArr);
    }

    return (
        <div className="max-w-[1200px] m-auto p-10">
            <h1 className="font-bold text-2xl">Sorting</h1>
            <h2 className="text-xl font-semibold mt-5">Bubble Sort</h2>

            <div className="bar-chart my-10 flex items-end gap-2">
                {arr.map((current_element, i) => (
                    <div key={i} className="w-4 bg-black flex items-center justify-center text-white font-bold p-4" style={{ height: `${current_element * 20}px` }}><h1>{current_element}</h1></div>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <button className="p-3 rounded-sm bg-black text-white font-bold" onClick={sortArrHandle}>
                    Sort Array By Bubble Sort
                </button>
                <button className="p-3 rounded-sm bg-black text-white font-bold" onClick={sortArrHandleQuick}>
                    Sort Array By Quick Sort
                </button>
                <button className="p-3 rounded-sm bg-black text-white font-bold" onClick={sortArrHandleSelectionSort}>
                    Sort Array By Selection Sort
                </button>


            </div>
        </div>
    );
}