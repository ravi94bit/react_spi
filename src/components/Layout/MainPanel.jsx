function MainPanel({ children }) {
    return (
  
      <div className="main-panel">
        <div className="content mt-5">
          {children}
        </div>
      </div>
    );
  }
  
  export default MainPanel;