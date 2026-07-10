const fs = require('fs');
const glob = require('glob'); // npm i glob if needed, but we can just use fs
const path = require('path');

const apiDir = './src/app/api';
const dirs = fs.readdirSync(apiDir);

dirs.forEach(dir => {
    const routePath = path.join(apiDir, dir, 'route.js');
    if (fs.existsSync(routePath)) {
        let content = fs.readFileSync(routePath, 'utf8');
        
        // Skip if already secured
        if (content.includes('auth()')) return;

        // Add import
        if (!content.includes("@clerk/nextjs/server")) {
            content = "import { auth } from '@clerk/nextjs/server';\n" + content;
        }

        // Add auth check inside the function
        // Find 'export async function POST(req) {' or 'export async function GET(req) {'
        const funcMatch = content.match(/export\s+async\s+function\s+(GET|POST|PUT|DELETE)\s*\([^)]*\)\s*\{\s*(try\s*\{)?/);
        
        if (funcMatch) {
            const insertion = `
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
`;
            content = content.replace(funcMatch[0], funcMatch[0] + insertion);
            fs.writeFileSync(routePath, content);
            console.log(`Secured ${routePath}`);
        }
    }
});
