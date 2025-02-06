"use client";
import { useEffect, useState, useMemo } from "react";
import { config } from "@/config";
import { formatPrice } from "@/utils/formatPrice";
import { Dolar, Tax } from "@/types";
import styles from "./styles.module.css";

const Page = () => {
  const [input, setInput] = useState<string>("");
  const [dolar, setDolar] = useState<Dolar[]>([]);
  const [currency, setCurrency] = useState<string>("USD");
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dolarRes, taxesRes] = await Promise.all([
          fetch(`${config.baseURL}/api/dolar`).then((res) => res.json()),
          fetch(`${config.baseURL}/api/taxes`).then((res) => res.json()),
        ]);
        setDolar(dolarRes);
        setTaxes(taxesRes);
        setIsDataLoaded(true); 
      } catch (error) {
        console.error(error);
        setIsDataLoaded(false);
      }
    };
    fetchData();
  }, []);

  const calculateFinalPrice = (
    price: number,
    currency: string,
    type: "oficial" | "mep" | "crypto"
  ) => {
    if (!isDataLoaded) return "Cargando...";

    const dolarPrice =
      type === "oficial"
        ? dolar[0]?.price
        : type === "mep"
          ? dolar[1]?.price
          : dolar[2]?.price;

    if (!dolarPrice) return "Dólar no disponible";

    let finalPrice = price * (currency === "USD" ? dolarPrice : 1);

    if (type !== "crypto") {
      const totalTaxes =
        type === "mep"
          ? taxes.find((tax) => tax.name === "IVA")?.percentage || 0.21
          : taxes.reduce((acc, tax) => acc + tax.percentage, 0);
      finalPrice *= 1 + totalTaxes;
    }

    return formatPrice(finalPrice);
  };

  const calculatedResults = useMemo(() => {
    if (!input || !isDataLoaded) return [];
    const inputValue = parseFloat(input);
    if (isNaN(inputValue)) return [];

    return [
      {
        total: calculateFinalPrice(inputValue, currency, "oficial"),
        currency: "Oficial",
      },
      {
        total: calculateFinalPrice(inputValue, currency, "mep"),
        currency: "MEP",
      },
      {
        total: calculateFinalPrice(inputValue, currency, "crypto"),
        currency: "Crypto",
      },
    ];
  }, [input, currency, dolar, taxes, isDataLoaded]);

  return (
    <section className={styles.container}>
      <h1>Calculadora de precios</h1>
      <div className={styles.inputGroup}>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
          placeholder="Ingresa el precio"
          disabled={!isDataLoaded}
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className={styles.selectInput}
          disabled={!isDataLoaded}
        >
          <option value="USD">USD</option>
          <option value="ARS">ARS</option>
        </select>
      </div>

      <h3>Cotización de dólar:</h3>
      <ul className={styles.list}>
        {dolar.map(({ id, name, price }) => (
          <li key={id}>
            <p>{name}: ${price}</p>
          </li>
        ))}
      </ul>

      <h2 className={styles.result}>Total:</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>
              <p>Dólar</p>
            </th>
            <th className={styles.tableHeader}>
              <p>Precio total en pesos</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {calculatedResults.map(({ total, currency }, index) => (
            <tr key={index} className={styles.tableRow}>
              <td className={styles.tableCell}>
                <p>{currency}</p>
              </td>
              <td className={styles.tableCell}>
                <p>{total}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Page;


// "use client";
// import { useEffect, useState, useMemo } from "react";
// import { config } from "@/config";
// import { formatPrice } from "@/utils/formatPrice";
// import { Dolar, Tax } from "@/types";
// import styles from "./styles.module.css";

// const Page = () => {
//   const [input, setInput] = useState<string>("");
//   const [dolar, setDolar] = useState<Dolar[]>([]);
//   const [currency, setCurrency] = useState<string>("USD");
//   const [taxes, setTaxes] = useState<Tax[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [dolarRes, taxesRes] = await Promise.all([
//           fetch(`${config.baseURL}/api/dolar`).then((res) => res.json()),
//           fetch(`${config.baseURL}/api/taxes`).then((res) => res.json()),
//         ]);
//         setDolar(dolarRes);
//         setTaxes(taxesRes);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const calculateFinalPrice = (price: number, currency: string,
//     type: "oficial" | "mep" | "crypto") => {
//     const dolarPrice = type === "oficial" ? dolar[0]?.price
//       : type === "mep" ? dolar[1]?.price
//         : dolar[2]?.price;

//     let finalPrice = price * (currency === "USD" ? dolarPrice || 1 : 1);

//     if (type !== "crypto") {
//       const totalTaxes = type === "mep"
//         ? taxes.find((tax) => tax.name === "IVA")?.percentage || 0.21
//         : taxes.reduce((acc, tax) => acc + tax.percentage, 0);
//       finalPrice *= 1 + totalTaxes;
//     }

//     return formatPrice(finalPrice);
//   };

//   const calculatedResults = useMemo(() => {
//     if (!input) return [];
//     const inputValue = parseFloat(input);
//     if (isNaN(inputValue)) return [];

//     return [
//       { total: calculateFinalPrice(inputValue, currency, "oficial"), currency: "Oficial" },
//       { total: calculateFinalPrice(inputValue, currency, "mep"), currency: "MEP" },
//       { total: calculateFinalPrice(inputValue, currency, "crypto"), currency: "Crypto" },
//     ];
//   }, [input, currency, dolar, taxes]);

//   return (
//     <section className={styles.container}>
//       <h1>Calculadora de precios</h1>
//       <div className={styles.inputGroup}>
//         <input
//           type="number"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className={styles.input}
//           placeholder="Ingresa el precio"
//         />
//         <select
//           value={currency}
//           onChange={(e) => setCurrency(e.target.value)}
//           className={styles.selectInput}
//         >
//           <option value="USD">USD</option>
//           <option value="ARS">ARS</option>
//         </select>
//       </div>

//       <h3>Cotización de dólar:</h3>
//       <ul className={styles.list}>
//         {dolar.map(({ id, name, price }) => (
//           <li key={id}><p>{name}: ${price}</p></li>
//         ))}
//       </ul>

//       <h2 className={styles.result}>Total:</h2>
//       <table className={styles.table}>
//         <thead>
//           <tr className={styles.tableRow}>
//             <th className={styles.tableHeader}><p>Dólar</p></th>
//             <th className={styles.tableHeader}><p>Precio total en pesos</p></th>
//           </tr>
//         </thead>
//         <tbody>
//           {calculatedResults.map(({ total, currency }, index) => (
//             <tr key={index} className={styles.tableRow}>
//               <td className={styles.tableCell}><p>{currency}</p></td>
//               <td className={styles.tableCell}><p>{total}</p></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   );
// };

// export default Page;