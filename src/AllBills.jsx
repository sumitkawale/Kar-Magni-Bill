import BillPage from "./BillPage"

export default function AllBills() {
    const allData = JSON.parse(localStorage.getItem("tableData") || "[]");
    const keyName = "basicDetails"
    const basicDetails = JSON.parse(localStorage.getItem(keyName) || "{}");

    const dataInArray = allData.map((rows) => {
        return Object.entries(rows).map((row) => {
            return row[1];
        })
    })

    // console.log(dataInArray)
    return <>
        {
            dataInArray.map(row => {
                return <BillPage data={row} basicDetails={basicDetails} />
            })
        }
    </>
}