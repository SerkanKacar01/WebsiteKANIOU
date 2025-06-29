// Simple test component to verify React is working
export default function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>KANIOU Test Application</h1>
      <p>If you can see this, React is working correctly.</p>
      <button onClick={() => alert('React click handlers work!')}>
        Test Button
      </button>
    </div>
  );
}