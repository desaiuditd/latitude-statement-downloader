// Global function from CoeJoder/waitForKeyElements.js
declare function waitForKeyElements(selector: string, callback: () => void): void;

// Global function from TamperMonkey.
// biome-ignore lint/style/useNamingConvention: Vendor function. Not our code.
declare function GM_addElement(tag: string, attrs: Record<string, string>);
