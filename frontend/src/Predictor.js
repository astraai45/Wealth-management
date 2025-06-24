import { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  ComposedChart,
  Brush,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    Age: 30,
    Credit_Score: 650,
    Debt_to_Income_Ratio: 0.3,
    Income: 50000,
    Loan_Amount: 20000,
    Employment_Stability: 5,
    Existing_Debts: 10000,
    Previous_Defaults: 0,
    Marital_Status: "Single",
    Assets_Value: 40000,
    Loan_Term: 36,
  });

  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Portfolio allocation data by age group and risk level
  const portfolioData = {
    "20-30": {
      Low: { Stocks: 20, MutualFunds: 40, RealEstate: 25, Gold: 15 },
      Medium: { Stocks: 40, MutualFunds: 30, RealEstate: 20, Gold: 10 },
      High: { Stocks: 60, MutualFunds: 20, RealEstate: 10, Gold: 10 },
    },
    "31-40": {
      Low: { Stocks: 25, MutualFunds: 35, RealEstate: 25, Gold: 15 },
      Medium: { Stocks: 45, MutualFunds: 30, RealEstate: 15, Gold: 10 },
      High: { Stocks: 65, MutualFunds: 20, RealEstate: 10, Gold: 5 },
    },
    "41-50": {
      Low: { Stocks: 20, MutualFunds: 30, RealEstate: 30, Gold: 20 },
      Medium: { Stocks: 40, MutualFunds: 30, RealEstate: 20, Gold: 10 },
      High: { Stocks: 55, MutualFunds: 25, RealEstate: 15, Gold: 5 },
    },
    "51-60": {
      Low: { Stocks: 15, MutualFunds: 25, RealEstate: 35, Gold: 25 },
      Medium: { Stocks: 35, MutualFunds: 30, RealEstate: 25, Gold: 10 },
      High: { Stocks: 50, MutualFunds: 25, RealEstate: 15, Gold: 10 },
    },
    "60+": {
      Low: { Stocks: 10, MutualFunds: 20, RealEstate: 40, Gold: 30 },
      Medium: { Stocks: 25, MutualFunds: 30, RealEstate: 30, Gold: 15 },
      High: { Stocks: 40, MutualFunds: 25, RealEstate: 20, Gold: 15 },
    },
  };

  // Growth assumptions data
  const growthData = [
    { name: "Stocks", Low: 8, Medium: 12, High: 15, color: "#4e73df" },
    { name: "Mutual Funds", Low: 6, Medium: 9, High: 12, color: "#1cc88a" },
    { name: "Real Estate", Low: 5, Medium: 7, High: 10, color: "#f6c23e" },
    { name: "Gold", Low: 4, Medium: 5, High: 7, color: "#e74a3b" },
  ];

  // Projected growth over 10 years
  const projectedGrowth = (riskLevel) => {
    const baseReturns = {
      Low: { Stocks: 0.08, MutualFunds: 0.06, RealEstate: 0.05, Gold: 0.04 },
      Medium: { Stocks: 0.12, MutualFunds: 0.09, RealEstate: 0.07, Gold: 0.05 },
      High: { Stocks: 0.15, MutualFunds: 0.12, RealEstate: 0.1, Gold: 0.07 },
    };

    let result = [];
    let total = 100000; // Starting with $100,000
    const salary = 50000;
    let investment = salary * 0.2; // Assuming 20% of salary invested annually

    for (let year = 1; year <= 10; year++) {
      const stockReturn =
        ((total * portfolioData[ageGroup][riskLevel].Stocks) / 100) *
        baseReturns[riskLevel].Stocks;
      const mfReturn =
        ((total * portfolioData[ageGroup][riskLevel].MutualFunds) / 100) *
        baseReturns[riskLevel].MutualFunds;
      const reReturn =
        ((total * portfolioData[ageGroup][riskLevel].RealEstate) / 100) *
        baseReturns[riskLevel].RealEstate;
      const goldReturn =
        ((total * portfolioData[ageGroup][riskLevel].Gold) / 100) *
        baseReturns[riskLevel].Gold;

      total =
        total + stockReturn + mfReturn + reReturn + goldReturn + investment;
      investment *= 1.05; // 5% salary increase

      result.push({
        year: year,
        name: `Year ${year}`,
        value: Math.round(total),
        Stocks: Math.round(stockReturn),
        MutualFunds: Math.round(mfReturn),
        RealEstate: Math.round(reReturn),
        Gold: Math.round(goldReturn),
      });
    }
    return result;
  };

  // Risk vs Return comparison
  const riskReturnComparison = [
    { name: "Low Risk", Return: 6, Risk: 2, color: "#36b9cc" },
    { name: "Medium Risk", Return: 9, Risk: 5, color: "#1cc88a" },
    { name: "High Risk", Return: 12, Risk: 8, color: "#e74a3b" },
  ];

  // Historical performance data
  const historicalPerformance = [
    { year: 2015, Low: 5.2, Medium: 8.1, High: 11.5 },
    { year: 2016, Low: 5.8, Medium: 9.3, High: 13.2 },
    { year: 2017, Low: 6.1, Medium: 10.5, High: 15.8 },
    { year: 2018, Low: 4.9, Medium: 7.8, High: 9.5 },
    { year: 2019, Low: 6.5, Medium: 11.2, High: 16.1 },
    { year: 2020, Low: 5.7, Medium: 9.8, High: 14.3 },
    { year: 2021, Low: 6.8, Medium: 12.1, High: 17.5 },
    { year: 2022, Low: 5.3, Medium: 8.9, High: 12.7 },
    { year: 2023, Low: 6.2, Medium: 10.7, High: 15.2 },
  ];

  // Determine age group based on age
  const getAgeGroup = (age) => {
    if (age >= 20 && age <= 30) return "20-30";
    if (age >= 31 && age <= 40) return "31-40";
    if (age >= 41 && age <= 50) return "41-50";
    if (age >= 51 && age <= 60) return "51-60";
    return "60+";
  };

  const ageGroup = getAgeGroup(formData.Age);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error making request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare data for charts
  const preparePortfolioData = () => {
    if (!prediction) return [];
    return Object.entries(portfolioData[ageGroup][prediction]).map(
      ([name, value]) => ({ name, value })
    );
  };

  const preparePieData = () => {
    if (!prediction) return [];
    const data = portfolioData[ageGroup][prediction];
    return Object.keys(data).map((key, index) => ({
      name: key,
      value: data[key],
      color: ["#4e73df", "#1cc88a", "#f6c23e", "#e74a3b"][index],
    }));
  };

  const prepareGrowthData = () => {
    if (!prediction) return [];
    return growthData.map((asset) => ({
      name: asset.name,
      value: asset[prediction],
      color: asset.color,
    }));
  };

  const prepareProjectedGrowth = () => {
    if (!prediction) return [];
    return projectedGrowth(prediction);
  };

  const prepareAssetGrowthComparison = () => {
    if (!prediction) return [];
    return [
      { name: "Stocks", value: growthData[0][prediction] },
      { name: "Mutual Funds", value: growthData[1][prediction] },
      { name: "Real Estate", value: growthData[2][prediction] },
      { name: "Gold", value: growthData[3][prediction] },
    ];
  };

  const prepareHistoricalPerformance = () => {
    if (!prediction) return [];
    return historicalPerformance.map((item) => ({
      year: item.year,
      value: item[prediction],
    }));
  };

  // Custom tooltip components
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const ProjectionTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
          <p>Total Value: ${payload[0].value.toLocaleString()}</p>
          <p>Stocks: ${payload[0].payload.Stocks.toLocaleString()}</p>
          <p>
            Mutual Funds: ${payload[0].payload.MutualFunds.toLocaleString()}
          </p>
          <p>Real Estate: ${payload[0].payload.RealEstate.toLocaleString()}</p>
          <p>Gold: ${payload[0].payload.Gold.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const HistoricalTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">Year: {payload[0].payload.year}</p>
          <p>Return: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="container">
          <h1>Financial Portfolio Advisor</h1>
          <p>
            Personalized investment recommendations based on your risk profile
          </p>
        </div>
      </header>

      <main className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card form-card">
              <div className="card-header">
                <h2>Loan Risk Assessment</h2>
              </div>
              <div className="card-body">
                {Object.keys(formData).map((key) => (
                  <div className="form-group" key={key}>
                    <label>{key.replace("_", " ")}</label>
                    {key === "Marital_Status" ? (
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    ) : (
                      <input
                        type={
                          key === "Debt_to_Income_Ratio" ? "number" : "number"
                        }
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="form-control"
                        step={key === "Debt_to_Income_Ratio" ? "0.01" : "1"}
                        min={key === "Credit_Score" ? 300 : 0}
                        max={key === "Credit_Score" ? 850 : undefined}
                      />
                    )}
                  </div>
                ))}

                <button
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    "Get Recommendation"
                  )}
                </button>

                {prediction && (
                  <div className="result-alert">
                    <h3>Recommended Risk Profile</h3>
                    <p className={`risk-level ${prediction.toLowerCase()}`}>
                      {prediction} Risk
                    </p>
                    <p>Age Group: {ageGroup}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {prediction && (
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h2>Portfolio Allocation</h2>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={preparePieData()}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {preparePieData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Additional chart below pie chart */}
              <div className="card mt-4">
                <div className="card-header">
                  <h2>Historical Performance ({prediction} Risk)</h2>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={prepareHistoricalPerformance()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis
                        label={{
                          value: "Return %",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip content={<HistoricalTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4e73df"
                        activeDot={{ r: 8 }}
                        name="Annual Return"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

        {prediction && (
          <>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h2>Asset Distribution</h2>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={preparePortfolioData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                          label={{
                            value: "Percentage",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                          dataKey="value"
                          fill="#4e73df"
                          name="Allocation %"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h2>Expected Annual Returns</h2>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={prepareGrowthData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                          label={{
                            value: "Return %",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="Return %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h2>10-Year Projection</h2>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={prepareProjectedGrowth()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ProjectionTooltip />} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#4e73df"
                          fill="#4e73df"
                          name="Portfolio Value"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h2>Risk vs Return</h2>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart>
                        <CartesianGrid />
                        <XAxis
                          type="number"
                          dataKey="Risk"
                          name="Risk"
                          unit="level"
                        />
                        <YAxis
                          type="number"
                          dataKey="Return"
                          name="Return"
                          unit="%"
                        />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Legend />
                        <Scatter
                          name="Risk-Return Profile"
                          data={riskReturnComparison}
                          fill="#8884d8"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Large visualization at bottom */}
            <div className="card mt-4">
              <div className="card-header">
                <h2>Detailed 10-Year Projection Analysis</h2>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={prepareProjectedGrowth()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      yAxisId="left"
                      label={{
                        value: "Portfolio Value ($)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{
                        value: "Annual Growth (%)",
                        angle: 90,
                        position: "insideRight",
                      }}
                    />
                    <Tooltip content={<ProjectionTooltip />} />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="Stocks"
                      name="Stocks Growth ($)"
                      fill="#4e73df"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="MutualFunds"
                      name="Mutual Funds Growth ($)"
                      fill="#1cc88a"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="value"
                      name="Total Portfolio Value ($)"
                      stroke="#ff6b6b"
                    />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h2>Asset Performance Comparison</h2>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart
                        outerRadius={90}
                        data={prepareAssetGrowthComparison()}
                      >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 15]} />
                        <Tooltip />
                        <Legend />
                        <Radar
                          name="Expected Return"
                          dataKey="value"
                          stroke="#4e73df"
                          fill="#4e73df"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h2>Detailed Year-by-Year Growth</h2>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={prepareProjectedGrowth()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ProjectionTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Stocks"
                          stroke="#4e73df"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="MutualFunds"
                          stroke="#1cc88a"
                        />
                        <Line
                          type="monotone"
                          dataKey="RealEstate"
                          stroke="#f6c23e"
                        />
                        <Line type="monotone" dataKey="Gold" stroke="#e74a3b" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>Financial Portfolio Advisor &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
