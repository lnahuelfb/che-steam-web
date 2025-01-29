"use client";
import { useEffect, useState } from "react";
import { config } from "@/config";
import { formatPrice } from "@/utils/formatPrice";
import styles from "./styles.module.css";

interface Tax {
  name: string;
  percentage: number;
  id: number;
}

interface Dolar {
  name: string;
  price: number;
  id: number;
}

interface Result {
  total: string;
  currency: string;
}

const Page = () => {
  const [result, setResult] = useState<Result[] | 0>([]);
  const [input, setInput] = useState<string>("");
  const [dolar, setDolar] = useState<Dolar[]>([]);
  const [currency, setCurrency] = useState<string>("USD");
  const [taxes, setTaxes] = useState<Tax[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const fetchDolar = async () => {
    try {
      const response = await fetch(`${config.baseURL}/api/dolar`);
      const data = await response.json();
      setDolar(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTaxes = async () => {
    try {
      const response = await fetch(`${config.baseURL}/api/taxes`);
      const data = await response.json();
      setTaxes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculatePrice = (price: number, currency: string) => {
    const dolarPrice = dolar[0]?.price
    let finalPrice = 0;

    const totalTaxes = Array.isArray(taxes)
      ? taxes.reduce((acc, tax) => acc + tax.percentage, 0)
      : 0;

    if (currency === "ARS") {
      finalPrice = price * (1 + totalTaxes);
    } else if (currency === "USD") {
      finalPrice = price * dolarPrice * (1 + totalTaxes);
    }

    return formatPrice(finalPrice);
  }

  const calculateMepPrice = (price: number, currency: string) => {
    const dolarPrice = dolar[1]?.price
    let finalPrice = 0;

    const totalTaxes = taxes.filter(tax => tax.name === "IVA")[0].percentage

    if (currency === "ARS") {
      finalPrice = price * (1 + totalTaxes);
    } else if (currency === "USD") {
      finalPrice = price * dolarPrice * (1 + totalTaxes);
    }

    return formatPrice(finalPrice);
  }

  const calculateCryptoPrice = (price: number, currency: string) => {
    const dolarPrice = dolar[2]?.price
    let finalPrice = 0;

    if (currency === "ARS") {
      finalPrice = price
    } else if (currency === "USD") {
      finalPrice = price * dolarPrice;
    }

    return formatPrice(finalPrice);
  }

  const calculateResult = () => {
    const inputValue = parseFloat(input.toString());
    if (isNaN(inputValue)) {
      setResult(0);
      return;
    }

    const finalResult: Result[] = []

    finalResult.push({
      total: calculatePrice(inputValue, currency),
      currency: "Oficial"
    })

    finalResult.push({
      total: calculateMepPrice(inputValue, currency),
      currency: "MEP"
    })

    finalResult.push({
      total: calculateCryptoPrice(inputValue, currency),
      currency: "Crypto"
    })

    setResult(finalResult);
  };

  useEffect(() => {
    fetchTaxes();
    fetchDolar();
  }, []);

  return (
    <section className={styles.container}>
      <h1>Calculadora de precios</h1>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter amount"
        />
        <select
          value={currency}
          onChange={handleCurrencyChange}
          className={styles.selectInput}
        >
          <option value="USD">USD</option>
          <option value="ARS">ARS</option>
        </select>
      </div>

      <button onClick={calculateResult} className={styles.button}>
        Calcular
      </button>

      <h3>Cotizacion de dolar:</h3>

      <ul className={styles.list}>
        {dolar?.map((dolar) => (
          <li key={dolar.id}>
            <p>
              {dolar.name}: ${dolar.price}
            </p>
          </li>
        ))}
      </ul>

      <h2 className={styles.result}>Total:</h2>

      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}><p>Dolar</p></th>
            <th className={styles.tableHeader}><p>Precio total</p></th>
          </tr>
        </thead>
        <tbody>
          {
            result !== 0 &&
            result?.map(({ total, currency }, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}><p>{currency}</p></td>
                <td className={styles.tableCell}><p>{total}</p></td>
              </tr>
            ))}
        </tbody>
      </table>

    </section>
  );
};

export default Page;