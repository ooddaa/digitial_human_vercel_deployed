/**
 * Dashboard will provide the main UI functionality for the 
 * authenticated user.
 * 
 * User can:
 * 
 * Add personal data attributes.
 * Add personal ID documents and describe their attributes.
 * Query and view data attributes.
 * Query available Verification Requests.
 * Issue Verification Requests for their attributes.
 * Issue Verification Responses to Verification Requests.
 * Grant and revoke Access Rights to their attributes.
 * View access history - who accessed their attributes.
 * 
 */
function Dashboard() {
  return (
      <div className='dashboard'>Dashboard</div>
  )
}

export default Dashboard

Dashboard.auth = {
  role: 'client',
  // loading: <Loading />,
  unauthorized: '/login',
}