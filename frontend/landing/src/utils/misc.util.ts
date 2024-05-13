const average = (array:number[]) => (array.reduce((a:any, b:any) => {return Number(a) + Number(b)},0) / array.length).toFixed(1);
export default average