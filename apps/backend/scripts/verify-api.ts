
async function verify() {
    const BASE_URL = 'http://localhost:8000/api';
    
    console.log('Verifying API at', BASE_URL);

    try {
        // Health
        const health = await fetch(`${BASE_URL}/health`);
        console.log('Health:', health.status, await health.json());

        // Projects
        const projects = await fetch(`${BASE_URL}/projects/`);
        console.log('Projects List:', projects.status);
        const projectsData = await projects.json();
        console.log('Projects Count:', Array.isArray(projectsData) ? projectsData.length : 'Not Array');
        if (Array.isArray(projectsData) && projectsData.length > 0) {
            console.log('Sample Project:', projectsData[0].slug);
        }

        // Departments
        const departments = await fetch(`${BASE_URL}/departments/`);
        console.log('Departments List:', departments.status);

        // Auth Check (Expect 401)
        console.log('Testing Protected Route (Create Project without Auth)...');
        const protectedRes = await fetch(`${BASE_URL}/projects/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Unauthorized Project' })
        });
        console.log('Protected Route Status:', protectedRes.status, protectedRes.status === 401 ? '(Pass)' : '(Fail)');
        
    } catch (e) {
        console.error('Verification failed', e);
    }
}

verify();
