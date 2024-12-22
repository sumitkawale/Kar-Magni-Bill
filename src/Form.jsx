import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'
import "./Form.css"

import { Link, useNavigate } from 'react-router-dom';

export default function Form() {
    const [workbook, updateWorkbook] = useState({})
    const [data, updateData] = useState(JSON.parse(localStorage.getItem("tableData")) || [])
    const [loadingStatus, updateLoadingStatus] = useState(false)
    const [basicDetails, updateBasicDetails] = useState({
        villageName: "",
        taalukaName: "",
        date: "",
        fromYear: "",
        toYear: ""
    })

    const navigate = useNavigate()

    // console.log(data)
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
            updateWorkbook(XLSX.read(e.target.result, { type: "binary" }));
            // console.log("workbook SheetNames:", workbook.SheetNames)
        }
    }

    const updateFormDetails = (e) => {
        const value = e.target.value;
        const key = e.target.id;
        updateBasicDetails(prev => {
            return {
                ...prev,
                [key]:value
            }
        })
        const keyName = "basicDetails"
        const details = {
            ...basicDetails,
            [key]:value
        }
        localStorage.setItem(keyName, JSON.stringify(details))
    }

    useEffect(() => {
        const keyName = "basicDetails"
        try {
            const data = localStorage.getItem(keyName) || "{}";
            const parsedData = JSON.parse(data);
            if (parsedData) {
                updateBasicDetails(parsedData)
            }
        } catch {
            //
        }
    }, [])

    function printData(e) {
        const tr = e.target.parentNode
        const rowData = [...tr.cells].map((cell) => {
            return cell.innerText
        })
        // console.log(rowData)
        if (rowData.length == 19) {
            const data = JSON.stringify(rowData)
            navigate("/print/" + data)
        }
    }

    function sheetChange(event) {
        const sheetName = workbook.SheetNames[event.target.value] || 0;

        console.log("sheetName:", sheetName)
        const sheet = workbook.Sheets[sheetName];
        console.log("sheet:", sheet)
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        let data = parsedData.filter((row) => Object.keys(row).length == 19)
        updateData(data)
        console.log({data})

        localStorage.setItem("tableData", JSON.stringify(data))

        updateLoadingStatus(false)
    }


    return <>
        <form>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} id='fileInput' />
            {
                workbook.SheetNames &&
                <>
                    <select onChange={sheetChange}>
                        {
                            workbook?.SheetNames?.map((name, index) => {
                                {/* console.log(name) */}
                                return <option key={name} value={index}>{name}</option>
                            })
                        }
                    </select>
                </>
            }
            <button type='reset' style={{ margin: "0 2rem" }} onClick={() => { localStorage.removeItem("tableData"); updateData([]) }}>reset</button>
            <hr />
            <input 
                type='text'
                value={basicDetails?.villageName || ""}
                placeholder='village name' 
                onChange={updateFormDetails} 
                id='villageName' 
            />
            <input 
                type='text'
                value={basicDetails?.taalukaName || ""}
                placeholder='परंडा / change name' 
                onChange={updateFormDetails} 
                id='taalukaName' 
            />
            <input 
                type='text'
                value={basicDetails?.date || ""}
                placeholder='enter date' 
                onChange={updateFormDetails} 
                id='date' 
            />
            <hr />
            <input 
                type='text'
                value={basicDetails?.fromYear || ""}
                placeholder='from year' 
                onChange={updateFormDetails} 
                id='fromYear' 
            />
            <input 
                type='text'
                value={basicDetails?.toYear || ""}
                placeholder='to year' 
                onChange={updateFormDetails} 
                id='toYear' 
            />
            <hr />
            <Link to={"/print/all"}><button style={{ padding: "10px 20px", margin: "0 1rem" }}>Print All</button></Link>
            <Link to={"/print/cover"}><button style={{ padding: "10px 20px", margin: "0 1rem" }}>Print Cover</button></Link>
        </form>
        <br />
        <hr />
        <br />
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