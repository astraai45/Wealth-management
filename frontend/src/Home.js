import React from "react";
import {
  BarChart2,
  Shield,
  PieChart,
  TrendingUp,
  DollarSign,
  Globe,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

function WealthManagementApp() {
  const financeData = {
    investmentProducts: [
      {
        name: "Global Equity Portfolio",
        category: "Growth",
        description:
          "Diversified international stocks with 5-year average return of 12.4%",
        riskLevel: "Moderate",
        image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvY2slMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        name: "Municipal Bond Fund",
        category: "Income",
        description:
          "Tax-exempt bonds with stable 3.8% yield and AAA average rating",
        riskLevel: "Low",
        image:
          "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    riskTools: [
      {
        name: "Portfolio Stress Test",
        category: "Analysis",
        description:
          "Simulate market crashes and economic scenarios on your portfolio",
        features: "2008 Crisis, Inflation Shock, Pandemic Scenario",
        image:
          "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Risk Exposure Dashboard",
        category: "Monitoring",
        description:
          "Real-time visualization of your portfolio's sector and geographic exposures",
        features: "Sector Heatmap, Concentration Alerts, Correlation Matrix",
        image:
          "https://images.unsplash.com/photo-1735469157670-1212e570eadc?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    marketInsights: [
      {
        name: "Quarterly Economic Outlook",
        category: "Research",
        description:
          "Macroeconomic forecasts and asset class expectations for next 6-12 months",
        update: "Updated Weekly",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmluYW5jaWFsJTIwZGF0YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        name: "Sector Rotation Model",
        category: "Strategy",
        description:
          "Data-driven recommendations for overweight/underweight sectors",
        update: "Updated Monthly",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
    ],
  };

  return (
    <div className="container-fluid p-0 wealth-app">
      {/* Premium Header */}
      <header className="finance-hero text-white text-center py-5 position-relative overflow-hidden">
        <div className="finance-hero-overlay"></div>
        <div className="position-relative container">
          <h1 className="display-3 fw-bold mb-3">WealthGuard Pro</h1>
          <p className="lead fs-4 mb-4">
            Advanced Wealth Management & Risk Intelligence Platform
          </p>
          <div className="hero-stats row g-4 justify-content-center">
            <div className="col-md-3">
              <div className="stat-card p-3">
                <DollarSign size={28} className="mb-2" />
                <h3>$4.2B+</h3>
                <p>Assets Under Analysis</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card p-3">
                <Globe size={28} className="mb-2" />
                <h3>12,500+</h3>
                <p>Global Securities Tracked</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card p-3">
                <Shield size={28} className="mb-2" />
                <h3>98%</h3>
                <p>Risk Alert Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-5">
        {/* Investment Products Section */}
        <section className="mb-5">
          <div className="section-header d-flex align-items-center mb-4">
            <TrendingUp size={36} className="me-3 text-primary" />
            <h2 className="h1 mb-0">Investment Solutions</h2>
          </div>
          <div className="row">
            {financeData.investmentProducts.map((product, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="card finance-card h-100 border-0 shadow-sm">
                  <div className="card-img-container">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="risk-badge">{product.riskLevel} Risk</div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h3 className="card-title">{product.name}</h3>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {product.category}
                        </h6>
                      </div>
                      <span className="badge bg-primary-light text-primary">
                        {product.category}
                      </span>
                    </div>
                    <p className="card-text mt-3">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risk Management Tools */}
        <section className="mb-5">
          <div className="section-header d-flex align-items-center mb-4">
            <Shield size={36} className="me-3 text-danger" />
            <h2 className="h1 mb-0">Risk Management Tools</h2>
          </div>
          <div className="row">
            {financeData.riskTools.map((tool, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="card finance-card h-100 border-0 shadow-sm">
                  <div className="card-img-container">
                    <img
                      src={tool.image}
                      className="card-img-top"
                      alt={tool.name}
                    />
                    <div className="feature-badge">Featured Tool</div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{tool.name}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {tool.category}
                    </h6>
                    <p className="card-text">{tool.description}</p>
                    <div className="features mt-3">
                      <strong>Key Features:</strong> {tool.features}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Insights */}
        <section className="mb-5">
          <div className="section-header d-flex align-items-center mb-4">
            <BarChart2 size={36} className="me-3 text-success" />
            <h2 className="h1 mb-0">Market Intelligence</h2>
          </div>
          <div className="row">
            {financeData.marketInsights.map((insight, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="card finance-card h-100 border-0 shadow-sm">
                  <img
                    src={insight.image}
                    className="card-img-top"
                    alt={insight.name}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h3 className="card-title">{insight.name}</h3>
                        <h6 className="card-subtitle text-muted">
                          {insight.category}
                        </h6>
                      </div>
                      <span className="badge bg-success-light text-success">
                        {insight.update}
                      </span>
                    </div>
                    <p className="card-text">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Features */}
        <section className="platform-features py-5 bg-light rounded-4 mb-5">
          <h2 className="text-center mb-5">Key Platform Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card p-4 h-100 bg-white rounded-3 shadow-sm">
                <PieChart size={40} className="mb-3 text-primary" />
                <h4>Portfolio Analytics</h4>
                <p>
                  Advanced visualization of asset allocation, performance
                  attribution, and risk metrics
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 h-100 bg-white rounded-3 shadow-sm">
                <Shield size={40} className="mb-3 text-danger" />
                <h4>Risk Monitoring</h4>
                <p>
                  Real-time alerts for concentration risk, liquidity concerns,
                  and market shocks
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 h-100 bg-white rounded-3 shadow-sm">
                <BarChart2 size={40} className="mb-3 text-success" />
                <h4>Scenario Analysis</h4>
                <p>
                  Test portfolio resilience against historical and hypothetical
                  market events
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Simplified Footer */}
      <footer className="bg-danger text-white py-5">
        <div className="container text-center">
          <h5>WealthGuard Pro</h5>
          <p className="mb-4">
            Advanced wealth management and risk analysis platform for
            institutional and high-net-worth investors.
          </p>
          <p className="mb-0">© 2025 WealthGuard Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default WealthManagementApp;
