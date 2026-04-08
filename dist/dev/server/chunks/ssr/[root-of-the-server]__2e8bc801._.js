module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/lib/photos.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$image$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/image-size/dist/index.mjs [app-rsc] (ecmascript)");
;
;
;
;
const basePath = ("TURBOPACK compile-time value", "") || '';
const getProjectCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
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
const getProjects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async (category)=>{
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
const getProjectBySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async (slug)=>{
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
                const dims = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$image$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(buffer);
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
const getAllProjectSlugs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const photosDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'photos');
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(photosDirectory)) return [];
    const entries = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(photosDirectory, {
        withFileTypes: true
    });
    return entries.filter((e)=>e.isDirectory()).map((e)=>e.name.toLowerCase().replace(/\s+/g, '-'));
});
}),
"[project]/app/photos/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
// app/photos/[slug]/page.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$photos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/photos.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function generateStaticParams() {
    const slugs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$photos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllProjectSlugs"])();
    return slugs.map((slug)=>({
            slug
        }));
}
async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$photos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProjectBySlug"])(slug);
    if (!project) {
        return {
            title: 'Not Found'
        };
    }
    return {
        title: `${project.title} | Photography`,
        description: project.description || `Photos from ${project.title}`
    };
}
function PhotoCard({ photo, index }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group overflow-hidden rounded-lg bg-neutral-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 border-2 border-white/10 rounded-lg pointer-events-none z-30"
            }, void 0, false, {
                fileName: "[project]/app/photos/[slug]/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            photo.type === 'video' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                src: photo.src,
                autoPlay: true,
                muted: true,
                loop: true,
                playsInline: true,
                className: "w-full h-auto"
            }, void 0, false, {
                fileName: "[project]/app/photos/[slug]/page.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                src: photo.src,
                alt: photo.title || `Photo ${index + 1}`,
                width: photo.width || 800,
                height: photo.height || 600,
                className: "w-full h-auto object-cover",
                sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
                priority: index < 3
            }, void 0, false, {
                fileName: "[project]/app/photos/[slug]/page.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/photos/[slug]/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
async function ProjectPage({ params }) {
    const { slug } = await params;
    const project = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$photos$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProjectBySlug"])(slug);
    if (!project) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    href: "/photos",
                    className: "inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "←"
                        }, void 0, false, {
                            fileName: "[project]/app/photos/[slug]/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        " Back to Projects"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/photos/[slug]/page.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/photos/[slug]/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-12 md:mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-5xl md:text-7xl font-bold tracking-tight mb-4",
                        children: project.title
                    }, void 0, false, {
                        fileName: "[project]/app/photos/[slug]/page.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-neutral-400 text-lg mb-2",
                        children: project.year
                    }, void 0, false, {
                        fileName: "[project]/app/photos/[slug]/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    project.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-neutral-300 max-w-2xl mt-6 text-lg leading-relaxed",
                        children: project.description
                    }, void 0, false, {
                        fileName: "[project]/app/photos/[slug]/page.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/photos/[slug]/page.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden flex flex-col gap-3",
                        children: project.photos.map((photo, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(PhotoCard, {
                                photo: photo,
                                index: index
                            }, photo.id, false, {
                                fileName: "[project]/app/photos/[slug]/page.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/photos/[slug]/page.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex lg:hidden flex-row gap-3",
                        children: Array.from({
                            length: 2
                        }).map((_, colIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 flex-1",
                                children: project.photos.map((photo, index)=>({
                                        photo,
                                        index
                                    })).filter((_, i)=>i % 2 === colIndex).map(({ photo, index })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(PhotoCard, {
                                        photo: photo,
                                        index: index
                                    }, photo.id, false, {
                                        fileName: "[project]/app/photos/[slug]/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 19
                                    }, this))
                            }, colIndex, false, {
                                fileName: "[project]/app/photos/[slug]/page.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/photos/[slug]/page.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:flex flex-row gap-3",
                        children: Array.from({
                            length: 3
                        }).map((_, colIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 flex-1",
                                children: project.photos.map((photo, index)=>({
                                        photo,
                                        index
                                    })).filter((_, i)=>i % 3 === colIndex).map(({ photo, index })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(PhotoCard, {
                                        photo: photo,
                                        index: index
                                    }, photo.id, false, {
                                        fileName: "[project]/app/photos/[slug]/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 19
                                    }, this))
                            }, colIndex, false, {
                                fileName: "[project]/app/photos/[slug]/page.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/photos/[slug]/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/photos/[slug]/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/photos/[slug]/page.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/photos/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/photos/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2e8bc801._.js.map