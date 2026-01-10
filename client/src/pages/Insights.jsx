import Navbar from '../components/Navbar';
import { chartData } from '../data/mockData';
import './Insights.css';

const Insights = () => {
  return (
    <div className="page-container">
      <Navbar 
        title="Progress & Insights" 
        subtitle="Analytics and recommendations for your projects" 
      />
      
      <div className="page-content">
        <div className="insights-grid">
          {/* Tasks by Status */}
          <div className="insight-card">
            <h3 className="insight-title">Tasks by Status</h3>
            <div className="chart-container">
              <div className="pie-chart">
                {chartData.tasksByStatus.map((item, index) => (
                  <div key={index} className="chart-item">
                    <div 
                      className="chart-color-box" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="chart-label">{item.label}: {item.value}</span>
                  </div>
                ))}
              </div>
              <div className="pie-visual">
                <div className="pie-segment blue" style={{ '--percentage': '20%' }}>
                  <span>To Do: 1</span>
                </div>
                <div className="pie-segment yellow" style={{ '--percentage': '40%' }}>
                  <span>In Progress: 2</span>
                </div>
                <div className="pie-segment green" style={{ '--percentage': '40%' }}>
                  <span>Done: 2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks by Priority */}
          <div className="insight-card">
            <h3 className="insight-title">Tasks by Priority</h3>
            <div className="chart-container">
              <div className="pie-chart">
                {chartData.tasksByPriority.map((item, index) => (
                  <div key={index} className="chart-item">
                    <div 
                      className="chart-color-box" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="chart-label">{item.label}: {item.value}</span>
                  </div>
                ))}
              </div>
              <div className="pie-visual">
                <div className="pie-segment red" style={{ '--percentage': '60%' }}>
                  <span>High: 3</span>
                </div>
                <div className="pie-segment yellow" style={{ '--percentage': '40%' }}>
                  <span>Medium: 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Completion Status */}
        <div className="insight-card full-width">
          <h3 className="insight-title">Project Completion Status</h3>
          <div className="bar-chart">
            <div className="bar-item">
              <div className="bar-label">Website Redesign</div>
              <div className="bar-container">
                <div className="bar-fill green" style={{ width: '65%' }}>65%</div>
              </div>
            </div>
            <div className="bar-item">
              <div className="bar-label">Mobile App Development</div>
              <div className="bar-container">
                <div className="bar-fill yellow" style={{ width: '30%' }}>30%</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="insight-card full-width">
          <h3 className="insight-title">
            <span className="title-icon">🤖</span> AI Suggestions
          </h3>
          <div className="suggestions-list">
            <div className="suggestion-item recommendation">
              <div className="suggestion-header">
                <span className="suggestion-badge">optimization</span>
                <span className="suggestion-title">Break down large tasks</span>
              </div>
              <p className="suggestion-text">
                Consider breaking tasks with descriptions longer than 100 characters into smaller, actionable items.
              </p>
            </div>

            <div className="suggestion-item warning">
              <div className="suggestion-header">
                <span className="suggestion-badge warning">warning</span>
                <span className="suggestion-title">Address overdue items</span>
              </div>
              <p className="suggestion-text">
                You have 5 overdue tasks. Prioritize these to get back on track.
              </p>
            </div>

            <div className="suggestion-item recommendation">
              <div className="suggestion-header">
                <span className="suggestion-badge">optimization</span>
                <span className="suggestion-title">Balance workload</span>
              </div>
              <p className="suggestion-text">
                In Progress tasks are at 30%. Consider moving more items to active status to maintain momentum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
