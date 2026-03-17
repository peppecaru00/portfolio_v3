module.exports = [
"[project]/portfolio_v3/app/favicon.ico.mjs { IMAGE => \"[project]/portfolio_v3/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/portfolio_v3/app/favicon.ico.mjs { IMAGE => \"[project]/portfolio_v3/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/portfolio_v3/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/portfolio_v3/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/portfolio_v3/lib/photos.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllProjectSlugs",
    ()=>getAllProjectSlugs,
    "getProjectBySlug",
    ()=>getProjectBySlug,
    "getProjectCategories",
    ()=>getProjectCategories,
    "getProjects",
    ()=>getProjects
]);
// lib/photos.ts
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portfolio_v3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$image$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portfolio_v3/node_modules/image-size/dist/index.mjs [app-rsc] (ecmascript)");
;
;
;
;
// More robust basePath detection for GitHub Pages
const getBasePath = ()=>{
    // If the env var is defined (even if empty), use it.
    // This makes it possible to force root-relative paths via an empty string.
    const envBasePath = ("TURBOPACK compile-time value", "");
    if ("TURBOPACK compile-time truthy", 1) {
        // Special case: allow "ROOT" to mean root path in build-time env configs.
        return ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : envBasePath;
    }
    //TURBOPACK unreachable
    ;
};
const basePath = getBasePath();
const getProjectCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const photosDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'photos');
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(photosDirectory)) {
        return [
            {
                name: 'All',
                slug: 'all',
                count: 0
            }
        ];
    }
    const entries = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(photosDirectory, {
        withFileTypes: true
    });
    const projectDirs = entries.filter((e)=>e.isDirectory());
    const categories = new Map();
    let totalProjects = 0;
    for (const dir of projectDirs){
        const projectPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(photosDirectory, dir.name);
        const hasImages = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(projectPath).some((f)=>[
                '.jpg',
                '.jpeg',
                '.png',
                '.webp',
                '.gif',
                '.mp4',
                '.mov',
                '.webm'
            ].includes(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(f).toLowerCase()));
        if (hasImages) {
            totalProjects++;
            const metaPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(projectPath, 'project.json');
            if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(metaPath)) {
                const meta = JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(metaPath, 'utf8'));
                if (meta.category) {
                    const slug = meta.category.toLowerCase();
                    categories.set(slug, (categories.get(slug) || 0) + 1);
                }
            }
        }
    }
    const catsArray = Array.from(categories.entries()).map(([slug, count])=>({
            name: slug.charAt(0).toUpperCase() + slug.slice(1),
            slug,
            count
        })).sort((a, b)=>a.name.localeCompare(b.name));
    return [
        {
            name: 'All',
            slug: 'all',
            count: totalProjects
        },
        ...catsArray
    ];
});
const getProjects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async (category)=>{
    const photosDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'photos');
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(photosDirectory)) {
        return [];
    }
    const entries = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(photosDirectory, {
        withFileTypes: true
    });
    const projectDirs = entries.filter((e)=>e.isDirectory());
    const allowedExts = [
        '.jpg',
        '.jpeg',
        '.png',
        '.webp',
        '.gif',
        '.mp4',
        '.mov',
        '.webm'
    ];
    const projects = [];
    for (const dir of projectDirs){
        const projectPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(photosDirectory, dir.name);
        const files = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(projectPath).filter((f)=>allowedExts.includes(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(f).toLowerCase())).sort((a, b)=>a.localeCompare(b, undefined, {
                numeric: true
            }));
        if (files.length === 0) continue;
        const metaPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(projectPath, 'project.json');
        let meta = {};
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(metaPath)) {
            meta = JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(metaPath, 'utf8'));
        }
        if (category && category !== 'all') {
            const projectCat = (meta.category || dir.name).toLowerCase();
            if (projectCat !== category) continue;
        }
        const coverFile = files[0];
        // Ensure no double slashes in path construction
        const cleanBasePath = basePath.replace(/\/$/, '');
        const coverSrc = `${cleanBasePath}/photos/${dir.name}/${coverFile}`;
        projects.push({
            id: dir.name,
            slug: dir.name.toLowerCase().replace(/\s+/g, '-'),
            title: meta.title || dir.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase()),
            year: meta.year || new Date().getFullYear().toString(),
            description: meta.description,
            coverImage: coverSrc,
            category: meta.category || 'uncategorized',
            photos: []
        });
    }
    return projects.sort((a, b)=>{
        const yearDiff = parseInt(b.year) - parseInt(a.year);
        return yearDiff !== 0 ? yearDiff : a.title.localeCompare(b.title);
    });
});
const getProjectBySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async (slug)=>{
    const photosDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'photos');
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(photosDirectory)) return null;
    const entries = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(photosDirectory, {
        withFileTypes: true
    });
    const projectDir = entries.find((e)=>e.isDirectory() && e.name.toLowerCase().replace(/\s+/g, '-') === slug);
    if (!projectDir) return null;
    const projectPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(photosDirectory, projectDir.name);
    const allowedExts = [
        '.jpg',
        '.jpeg',
        '.png',
        '.webp',
        '.gif',
        '.mp4',
        '.mov',
        '.webm'
    ];
    const files = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(projectPath).filter((f)=>allowedExts.includes(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(f).toLowerCase())).sort((a, b)=>a.localeCompare(b, undefined, {
            numeric: true
        }));
    const metaPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(projectPath, 'project.json');
    let meta = {};
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(metaPath)) {
        meta = JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(metaPath, 'utf8'));
    }
    const cleanBasePath = basePath.replace(/\/$/, '');
    const photos = await Promise.all(files.map(async (file)=>{
        const id = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(file, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(file));
        const ext = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(file).toLowerCase();
        const isVideo = [
            '.mp4',
            '.mov',
            '.webm'
        ].includes(ext);
        const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(projectPath, file);
        let width = 800;
        let height = 600;
        if (!isVideo) {
            try {
                const buffer = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath);
                const dims = (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$image$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(buffer);
                width = dims.width || width;
                height = dims.height || height;
            } catch (e) {
                console.warn(`Could not read dimensions for ${filePath}`);
            }
        } else {
            width = 1920;
            height = 1080;
        }
        const photoMetaPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(projectPath, `${id}.json`);
        let photoMeta = {
            title: id.replace(/[-_]/g, ' ')
        };
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(photoMetaPath)) {
            photoMeta = {
                ...photoMeta,
                ...JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(photoMetaPath, 'utf8'))
            };
        }
        return {
            id,
            src: `${cleanBasePath}/photos/${projectDir.name}/${file}`,
            type: isVideo ? 'video' : 'image',
            width,
            height,
            ...photoMeta
        };
    }));
    const coverFile = files[0];
    const coverSrc = `${cleanBasePath}/photos/${projectDir.name}/${coverFile}`;
    return {
        id: projectDir.name,
        slug,
        title: meta.title || projectDir.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (l)=>l.toUpperCase()),
        year: meta.year || new Date().getFullYear().toString(),
        description: meta.description,
        coverImage: coverSrc,
        category: meta.category || 'uncategorized',
        photos
    };
});
const getAllProjectSlugs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const photosDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'photos');
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(photosDirectory)) return [];
    const entries = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(photosDirectory, {
        withFileTypes: true
    });
    return entries.filter((e)=>e.isDirectory()).map((e)=>e.name.toLowerCase().replace(/\s+/g, '-'));
});
}),
"[project]/portfolio_v3/app/photos/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PhotosPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portfolio_v3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
// app/photos/page.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$lib$2f$photos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portfolio_v3/lib/photos.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portfolio_v3/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/portfolio_v3/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
const metadata = {
    title: 'Photography | Portfolio',
    description: 'A collection of photography projects'
};
async function PhotosPage({ searchParams }) {
    const selectedCategory = (searchParams?.category || 'all').toLowerCase();
    const [projects, categories] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$lib$2f$photos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProjects"])(selectedCategory),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$lib$2f$photos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProjectCategories"])()
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-12 md:mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2",
                        children: "Photogallery"
                    }, void 0, false, {
                        fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-neutral-400 text-lg",
                        children: "Selected works"
                    }, void 0, false, {
                        fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex flex-wrap gap-3"
                    }, void 0, false, {
                        fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",
                children: projects.map((project)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: `/photos/${project.slug}`,
                        className: "group relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-900 block cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                src: project.coverImage,
                                alt: project.title,
                                fill: true,
                                className: "object-cover transition-transform duration-700 group-hover:scale-105",
                                sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            }, void 0, false, {
                                fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                            }, void 0, false, {
                                fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex flex-col justify-end p-6 pointer-events-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold tracking-wide mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500",
                                        children: project.title
                                    }, void 0, false, {
                                        fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-neutral-400 text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75",
                                        children: project.year
                                    }, void 0, false, {
                                        fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$portfolio_v3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs uppercase tracking-widest text-white/80",
                                    children: "View Project"
                                }, void 0, false, {
                                    fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this)
                        ]
                    }, project.id, true, {
                        fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/portfolio_v3/app/photos/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/portfolio_v3/app/photos/page.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/portfolio_v3/app/photos/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/portfolio_v3/app/photos/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__40f0f0b0._.js.map