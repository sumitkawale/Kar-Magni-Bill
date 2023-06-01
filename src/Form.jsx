import { useState } from 'react';
import * as XLSX from 'xlsx'
import "./Form.css"

import { useNavigate } from 'react-router-dom';

export default function Form() {
    const [data, updateData] = useState(JSON.parse(localStorage.getItem("tableData")) || [])
    const [loadingStatus, updateLoadingStatus] = useState(false)

    const navigate = useNavigate()

    console.log(data)
    const decimalPlaces = 3;

    function giveFixDecimalsOnly(value) {
        if (Number.isInteger(value)) return value;
        if (!Number.isFinite(value)) return value;
        return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces)
    }

    const selectFile = () => {
        document.getElementById("fileInput").click()
    }

    const handleFileUpload = (e) => {
        updateLoadingStatus(true)
        updateData([])
        localStorage.removeItem("tableData")

        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: "binary" });
            console.log("workbook:", workbook)
            const sheetName = workbook.SheetNames[2] || 0;
            console.log("sheetName:", sheetName)
            const sheet = workbook.Sheets[sheetName];
            console.log("sheet:", sheet)
            const parsedData = XLSX.utils.sheet_to_json(sheet);

            let data = parsedData.filter((row) => Object.keys(row).length == 19)
            updateData(data)

            localStorage.setItem("tableData", JSON.stringify(data))

            updateLoadingStatus(false)
        }
    }

    function printData(e) {
        const tr = e.target.parentNode
        const rowData = [...tr.cells].map((cell) => {
            return cell.innerText
        })
        console.log(rowData)
        if (rowData.length == 19) {
            const data = JSON.stringify(rowData)
            navigate("/print/" + data)
        }
    }

    return <>
        <form><input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} id='fileInput' /><button type='reset' onClick={() => localStorage.removeItem("tableData")}>reset</button></form>
        <br /><hr /><br />
        <table border={1} className='dataTable'>
            <thead>
                <tr>
                    <th rowSpan={2}>अ.क्र.</th>
                    <th rowSpan={2}>मालमत्ता क्र.</th>
                    <th rowSpan={2}>ज्या इसमाकडून कर येणे आहे त्याचे  नाव</th>
                    <th colSpan={3}>घरपट्टी</th>
                    <th colSpan={3}>विज कर</th>
                    <th colSpan={3}>आरोग्य कर</th>
                    <th colSpan={3}>जन.पाणी पट्टी</th>
                    <th colSpan={3}>स्पे.पाणी पट्टी</th>
                    <th rowSpan={2}>एकंदर एकुण</th>
                </tr>
                <tr>
                    <th>मागील बाकी</th>
                    <th>चालू  बाकी</th>
                    <th>एकुण</th>

                    <th>मागील बाकी</th>
                    <th>चालू  बाकी</th>
                    <th>एकुण</th>

                    <th>मागील बाकी</th>
                    <th>चालू  बाकी</th>
                    <th>एकुण</th>

                    <th>मागील बाकी</th>
                    <th>चालू  बाकी</th>
                    <th>एकुण</th>

                    <th>मागील बाकी</th>
                    <th>चालू  बाकी</th>
                    <th>एकुण</th>
                </tr>
            </thead>

            <tbody className='english'>
                {
                    loadingStatus && <tr>
                        <td colSpan={19} className='msg loader-td'>
                            <div className='loader'></div>
                        </td>
                    </tr>
                }
                {
                    data.length ? data.map((row, i) => {
                        return <tr onClick={printData} key={"read_row" + i}>
                            {
                                Object.keys(row).map((key, i) => {
                                    return <td key={"read_data" + i}>{giveFixDecimalsOnly(row[key])}</td>
                                })
                            }
                        </tr>
                    }) :
                        (loadingStatus ||
                            <tr>
                                <td colSpan={19} className='msg' onClick={selectFile}>
                                    <b>Please Select .XLSX file</b>
                                </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
    </>
}