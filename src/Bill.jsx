import { useParams } from "react-router-dom"

export default function Bill() {
    let data = useParams().data
    data = JSON.parse(data)
    console.log(data)

    return <>
        <div className='billBody p'>
            <div className='text-center billHead'>
                <h1>कर मागणीचे बील</h1>
                <p className='english billNumber'>No. <span style={{ fontSize: "2rem" }}> {(Number.parseInt(data[0]) || 0) + 214}</span></p>
            </div>
            <p className="word-spacing">मुंबई ग्रामपंचायत कायदा १९५८ च्या कलम १२९(१) अन्वये</p>
            <h2 className="text-justify word-spacing">ग्रामपंचायत अनाळा तालुका परांडा यांजकडून</h2>
            <p>श्री./श्रीमती <span className="px-2">{data[2]}</span> घर नं. <span className="px-2">{data[1]}</span> यांस </p>
            <p className="word-spacing">टॅक्स फी अगर इतर येण्यासंबंधीचा तपशील सन - २०२३ - २०२४ सालाचे</p>
            <table border="1px">
                <thead>
                    <tr>
                        <th>अनु.<br />क्रमांक १</th>
                        <th>टॅक्स. फी अगर इतर देण्याचा तपशील २</th>
                        <th>मागील बाकी ३</th>
                        <th>चालू कर ४</th>
                        <th>एकूण ५</th>
                        <th>शेरा ६</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>घरपट्टी</td>
                        <td>{data[3] || 0}</td>
                        <td>{data[4] || 0}</td>
                        <td>{data[5] || 0}</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>वीजकर</td>
                        <td>{data[6] || 0}</td>
                        <td>{data[7] || 0}</td>
                        <td>{data[8] || 0}</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>आरोग्य कर</td>
                        <td>{data[9] || 0}</td>
                        <td>{data[10] || 0}</td>
                        <td>{data[11] || 0}</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>पाणीपट्टी</td>
                        <td>{data[12] || 0}</td>
                        <td>{data[13] || 0}</td>
                        <td>{data[14] || 0}</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>स्पेशल पाणीपट्टी</td>
                        <td>{data[15] || 0}</td>
                        <td>{data[16] || 0}</td>
                        <td>{data[17] || 0}</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>व्यवसाय कर</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>0</td>
                    </tr>
                    <tr className="lastBorder">
                        <td>7</td>
                        <td>इतर</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">एकूण -</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td style={{ fontSize: "1.1rem" }}>{data[18]}</td>
                    </tr>
                </tfoot>
            </table>
            <p style={{ marginTop: ".5rem" }}>
                १) वर नमूद केलेली टॅक्स फी अगर इतर देण्याची रक्कम आपले कडून पंचायतीस येणे आहे त्याची कृपया दखल घ्यावी, हे बील मिळाले पासून १५ दिवसाचे आत सदरहू रक्कम पंचायतीस द्यावी अशी आपणांस विनंती आहे.
            </p>
            <p style={{ textIndent: "2rem" }}>
                जर सदरहू रक्कम निर्दिष्ट केलेल्या मुदतीस दिली नाही तर १९५८ च्या मुंबई ग्रामपंचायत कायद्याचे कलम १२९ (२) अन्वये मागणी पत्रक तुमचेवर बजावण्यात येईल. त्यावरून सदरहू रक्कम तुम्ही पंचायतीस देण्यास पात्र व्हाल.
            </p>
            <div style={{ marginTop: "2rem" }} className="flex justify-space-between">
                <p>तारीख: </p>
                <div>
                    <p>सरपंच / ग्रामसेवक</p>
                    <p>ग्रा.पं अनाळा  तालुका परंडा</p>
                </div>
            </div>
        </div>
    </>
}