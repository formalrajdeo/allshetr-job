const fs = require('fs');
const path = require('path');

// --- Utility to create clean slugs
function slugify(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize('NFD') // remove accents
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, ' ')
        .replace(/[\s-]+/g, '-')
        .trim();
}

// --- Clean up and standardize locations
function parseLocation(placeholders) {
    const locLabel = placeholders.find(p => p.type === 'location')?.label;
    if (!locLabel) return '';
    const parts = [];

    locLabel.split(',').forEach(part => {
        const m = part.match(/^([^\(]+)\(([^)]+)\)$/);
        if (m) {
            parts.push(m[1].trim());
            m[2].split('+').map(e => e.trim()).forEach(e => parts.push(e));
        } else {
            parts.push(part.trim());
        }
    });

    const seen = new Set();
    return parts
        .map(p => slugify(p))
        .filter(s => s && !seen.has(s) && seen.add(s))
        .join('-');
}

// --- Map company names to slugs
function companyHashTable(rawData) {
    return rawData.reduce((map, { companyName }) => {
        map[companyName] = slugify(companyName);
        return map;
    }, {});
}

// --- Load jobs data
const jobs = JSON.parse(fs.readFileSync(path.join(__dirname, 'jobs.json'), 'utf-8'));

// --- Company slug lookup
const companySlugMap = companyHashTable(jobs);

// --- Final output
const finalOutput = jobs.map(job => {
    const companySlug = companySlugMap[job.companyName] || slugify(job.companyName);
    const jobSlug = slugify(job.title);
    const location = parseLocation(job.placeholders);
    const experience = `${job.minimumExperience}-to-${job.maximumExperience}-years`;
    const companyId = job.companyId ? String(job.companyId).toLowerCase() : null;

    return {
        jdURL: `/job-listings-${jobSlug}-${companySlug}-${location}-${experience}-${job.jobId}`,
        staticUrl: companyId
            ? `${companySlug}-jobs-careers-${companyId}`
            : `${companySlug}-jobs-careers`
    };
});

console.log(finalOutput);
