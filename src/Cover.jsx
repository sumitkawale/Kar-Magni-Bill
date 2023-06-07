import "./Cover.css"
import CoverTable from "./CoverTable"
export default function Cover() {
    const table = JSON.parse(localStorage.getItem("tableData") || "[]")

    const chunkSize = 50;
    const data = []
    for (let i = 0; i < table.length; i += chunkSize) {
        const d = [];
        const outerChunk = table.slice(i, i + chunkSize);

        const innerChunkSize = 25;
        for (let j = 0; j < outerChunk.length; j += innerChunkSize) {
            const chunk = outerChunk.slice(j, j + innerChunkSize);
            d.push(chunk)
        }
        data.push(d)
        // console.log(data)
    }

    return <>
        {
            data.map((data, id) => {
                return <>
                    <div key={id + "_data"} className="coverPage">
                        <CoverTable data={data[0]} />
                        <div className="gap"></div>
                        <CoverTable data={data[1]} />
                    </div>
                </>
            })
        }
    </>
}