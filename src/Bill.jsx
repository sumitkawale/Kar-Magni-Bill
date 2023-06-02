import { useParams } from "react-router-dom"

function makeDecimal(value) {
    value = Number.parseFloat(value);
    if (Number.isInteger(value)) return value;
    if (!Number.isFinite(value)) {
        // alert("Some Numbers are not in readable")
    }

    return Number(Math.round(parseFloat(value + 'e' + 3)) + 'e-' + 3)
}

function makeSolid(value) {
    value = Number.parseInt(value);

    const mod = (value % 10)
    console.log(value, mod)
    if (mod < 5) {
        value = value - mod;
    } else {
        value = value + (10 - mod)
    }
    return value;
}

export default function Bill(props) {
    let data = props.data ?? JSON.parse(useParams().data || "[]")
    // console.log(data)

    const magilBakiSum = makeDecimal(makeDecimal(data[3]) + makeDecimal(data[6]) + makeDecimal(data[9]) + makeDecimal(data[12]) + makeDecimal(data[15]));
    const chaluKarSum = makeDecimal(makeDecimal(data[4]) + makeDecimal(data[7]) + makeDecimal(data[10]) + makeDecimal(data[13]) + makeDecimal(data[16]));

    return <>
        <div className='billBody p'>
            <div className='text-center billHead'>
                <h1>कर मागणीचे बील</h1>
                <p className='english billNumber'>No. <span style={{ fontSize: "2rem" }}> {(Number.parseInt(data[0]) || 0) + 0}</span></p>
            </div>
            <p className="word-spacing">मुंबई ग्रामपंचायत कायदा १९५८ च्या कलम १२९(१) अन्वये</p>
            <h2 className="text-justify word-spacing">ग्रामपंचायत अनाळा तालुका परांडा यांजकडून</h2>
            <p>श्री./श्रीमती <span>{data[2] || <span style={{ padding: "0 6rem" }}></span>}</span> घर नं. <span>{data[1] || <span className="px-4"></span>}</span> यांस </p>
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
                        <td className="text-right">1</td>
                        <td>घरपट्टी</td>
                        <td className="text-right">{makeDecimal(data[3]) || "0"}</td>
                        <td className="text-right">{makeDecimal(data[4]) || "0"}</td>
                        <td className="text-right">{makeDecimal(data[5]) || "0"}</td>
                        <td className="text-right"></td>
                    </tr>
                    <tr>
                        <td className="text-right">2</td>
                        <td>वीजकर</td>
                        <td className="text-right">{makeDecimal(data[6]) || "0"}</td>
                        <td className="text-right">{makeDecimal(data[7]) || "0"}</td>
                        <td className="text-right">{makeDecimal(data[8]) || "0"}</td>
                        <td className="text-right"></td>
                    </tr>
                    <tr>
                        <td className="text-right">3</td>
                        <td>आरोग्य कर</td>
                        <td className="text-right">{makeDecimal(data[9]) || "0"}</td>
                        <td className="text-right">{makeDecimal(data[10]) || "0"}</td>
                        <td className="text-right">{makeDecimal(data[11]) || "0"}</td>
                        <td className="text-right"></td>
                    </tr>
                    <tr>
                        <td className="text-right">4</td>
                        <td>पाणीपट्टी</td>
                        <td className="text-right">{makeDecimal(data[12]) || "0"}</td>
                        <td className="text-right">{makeDecimal(data[13]) || "0"}</td>
                        <td className="text-right">{makeDecimal(data[14]) || "0"}</td>
                        <td className="text-right"></td>
                    </tr>
                    <tr>
                        <td className="text-right">5</td>
                        <td>स्पेशल पाणीपट्टी</td>
                        <td className="text-right">{makeDecimal(data[15]) || "0"}</td>
                        <td className="text-right">{makeDecimal(data[16]) || "0"}</td>
                        <td className="text-right">{makeDecimal(data[17]) || "0"}</td>
                        <td className="text-right"></td>
                    </tr>
                    <tr className="lastBorder">
                        <td className="text-right">6</td>
                        <td>इतर</td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">एकूण -</td>
                        <td>{magilBakiSum || ""}</td>
                        <td>{chaluKarSum || ""}</td>
                        <td style={{ fontSize: "1.1rem" }}>{makeDecimal((magilBakiSum + chaluKarSum)) || makeDecimal(data[18]) || ""}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <p style={{ marginTop: ".5rem", textAlign: "justify", textIndent: "1rem" }}>
                हे बील आपणास प्राप्त झाल्यापासून देय रकमांचा भरणा १५ दिवसांच्या आत करावा. अन्यथा ग्रामपंचायत अधिनियमाच्या कलाम क्र. १२९(२) अन्यये आपल्यावर मागणी बजावण्यात येईल.
            </p>
            <p style={{ textIndent: "0rem" }}>
                टीप:- १) आर्थिक वर्षातील पहिल्या ६ महिन्यांत कराची पूर्ण रक्कम भरल्यास एकूण करात ५%  सूट देण्यात येईल.
            </p>
            <p style={{ textIndent: "1rem" }}>
                २) पूर्ण आर्थिक वर्षात कराची  रक्कम न भरल्यास त्यापुढील वर्षी एकूण करास ५% दंड आकारन्यात येईल
            </p>
            <div style={{ marginTop: "2.5rem" }} className="flex justify-space-between">
                <p>तारीख: 08/06/2023</p>
                <div>
                    <p style={{ textIndent: "1rem" }}>सरपंच / ग्रामसेवक</p>
                    <p>ग्रा.पं अनाळा  तालुका परंडा</p>
                </div>
            </div>
        </div>
    </>
}