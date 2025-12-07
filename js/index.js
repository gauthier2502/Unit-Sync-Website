// Index page specific components

// Dashboard Mockup Component
function renderDashboardMockup() {
    const container = document.getElementById('dashboard-mockup');
    if (!container) return;

    container.innerHTML = `
        <div class="relative w-full mx-auto group perspective-1000">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>

            <div class="relative bg-[#0B1121] rounded-xl ring-1 ring-white/10 shadow-2xl overflow-hidden flex flex-col h-full">
                <div class="flex items-center justify-between px-4 py-3 bg-[#151e32] border-b border-white/5 shrink-0">
                    <div class="flex items-center space-x-2">
                        <div class="flex space-x-1.5">
                            <div class="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                        </div>
                    </div>
                    <div class="hidden sm:flex items-center bg-[#0B1121] rounded-md px-3 py-1 border border-white/5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500 mr-2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <span class="text-[10px] text-slate-500">Search patients...</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div class="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        <div class="text-[10px] font-mono text-slate-400">v2.4 Live</div>
                    </div>
                </div>

                <div class="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 h-full">
                    <div class="sm:col-span-4 grid grid-cols-3 sm:grid-cols-1 gap-4 h-full">
                        <div class="bg-[#151e32]/50 p-3 sm:p-4 rounded-lg border border-white/5 flex flex-col justify-between group/card hover:bg-[#151e32] transition-colors">
                            <div class="flex items-center text-xs text-slate-400 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E5BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                                <span class="hidden xs:inline">Load</span>
                            </div>
                            <div>
                                <div class="text-lg sm:text-2xl font-bold text-white tracking-tight">84%</div>
                                <div class="text-[10px] text-green-400 font-medium mt-1">✓ Capacity</div>
                            </div>
                        </div>

                        <div class="bg-[#151e32]/50 p-3 sm:p-4 rounded-lg border border-white/5 flex flex-col justify-between group/card hover:bg-[#151e32] transition-colors">
                            <div class="flex items-center text-xs text-slate-400 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E5BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                <span class="hidden xs:inline">Queue</span>
                            </div>
                            <div>
                                <div class="text-lg sm:text-2xl font-bold text-white tracking-tight">12</div>
                                <div class="text-[10px] text-green-400 font-medium mt-1">↓ 15%</div>
                            </div>
                        </div>

                        <div class="bg-[#151e32]/50 p-3 sm:p-4 rounded-lg border border-white/5 flex flex-col justify-between group/card hover:bg-[#151e32] transition-colors">
                            <div class="flex items-center text-xs text-slate-400 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500 mr-2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span class="hidden xs:inline">Wait</span>
                            </div>
                            <div>
                                <div class="text-lg sm:text-2xl font-bold text-white tracking-tight">24m</div>
                                <div class="text-[10px] text-slate-500 font-medium mt-1">Avg</div>
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-8 bg-[#151e32]/30 rounded-lg border border-white/5 p-4 sm:p-5 relative flex flex-col min-h-[250px] sm:min-h-0">
                        <div class="flex justify-between items-center mb-6">
                            <div class="flex items-center space-x-2">
                                <h4 class="text-sm font-medium text-slate-200">ED Inflow Prediction</h4>
                            </div>
                            <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">AI Active</span>
                        </div>

                        <div class="flex-1 w-full min-h-[180px] bg-[#0B1121]/50 rounded-lg p-4">
                            <svg viewBox="0 0 400 150" class="w-full h-full">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style="stop-color:#2E5BFF;stop-opacity:0.4" />
                                        <stop offset="100%" style="stop-color:#2E5BFF;stop-opacity:0" />
                                    </linearGradient>
                                </defs>

                                <polyline
                                    fill="url(#chartGradient)"
                                    stroke="#2E5BFF"
                                    stroke-width="2"
                                    points="0,130 50,115 100,95 150,105 200,70 250,80 300,95 350,75 400,150 400,150 0,150"
                                />

                                <polyline
                                    fill="none"
                                    stroke="#64748b"
                                    stroke-width="1"
                                    stroke-dasharray="4,4"
                                    points="0,135 50,120 100,100 150,110 200,75 250,85 300,100 350,80"
                                />
                            </svg>
                        </div>

                        <div class="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#0B1121]/90 backdrop-blur border border-red-500/30 p-3 rounded-lg flex items-center space-x-3 shadow-lg">
                            <div class="bg-red-500/10 p-1.5 rounded-full shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                            </div>
                            <div>
                                <div class="text-xs font-bold text-white">Surge Predicted: 18:00</div>
                                <div class="text-[10px] text-slate-400">Recommendation: Staff +2 Nurses</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Features Grid Component
function renderFeaturesGrid() {
    const container = document.getElementById('features-grid');
    if (!container) return;

    container.innerHTML = `
        <section class="py-24 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 space-y-2">
                <h2 class="text-4xl md:text-5xl font-serif font-bold text-slate-900">
                    Five smart features administrators love.
                </h2>
                <p class="text-xl text-slate-500 font-serif italic">
                    (Discover many more in the dashboard.)
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <!-- Feature 1: Predictive Inflow -->
                <div class="group flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
                    <div class="p-8 pb-0 flex flex-col h-full">
                        <h3 class="text-2xl font-serif font-bold text-slate-900 mb-3">Predictive Inflow</h3>
                        <p class="text-slate-600 leading-relaxed mb-6 max-w-md">Discover the reasons behind every major surge in patient volume with detailed, AI-generated summaries embedded right on the performance chart.</p>
                        <div class="flex items-center text-[#2E5BFF] font-semibold text-sm cursor-pointer mb-8 group/link">
                            <span>Learn more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                        <div class="flex-1 w-full flex items-end justify-center overflow-hidden">
                            <div class="w-full h-64 bg-white rounded-t-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-4 border border-b-0 border-slate-200 relative">
                                <div class="absolute top-4 left-6 z-10 flex flex-col items-start">
                                    <div class="flex items-center space-x-2 mb-1">
                                        <span class="flex h-2 w-2 relative">
                                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                        <span class="text-xs font-bold text-red-500 uppercase tracking-wider">Surge Detected</span>
                                    </div>
                                    <div class="text-2xl font-bold text-slate-900">142 <span class="text-sm font-normal text-slate-500">Patients/hr</span></div>
                                </div>

                                <svg viewBox="0 0 300 180" class="w-full h-full mt-12">
                                    <defs>
                                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="5%" style="stop-color:#2E5BFF;stop-opacity:0.1" />
                                            <stop offset="95%" style="stop-color:#2E5BFF;stop-opacity:0" />
                                        </linearGradient>
                                    </defs>
                                    <polyline
                                        fill="url(#areaGradient)"
                                        stroke="#2E5BFF"
                                        stroke-width="3"
                                        points="0,140 40,120 80,85 120,95 160,50 200,40 240,30 280,45 300,60 300,180 0,180"
                                    />
                                </svg>

                                <div class="absolute top-[35%] right-[25%] bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg shadow-lg flex items-center space-x-2 border border-slate-700 animate-bounce" style="animation-duration: 3s">
                                    <div class="flex flex-col items-start">
                                        <span class="font-bold text-red-400">Peak Predicted</span>
                                        <span class="text-[9px] text-slate-300">14:00 • +45% Volume</span>
                                    </div>
                                </div>

                                <div class="absolute bottom-3 left-6 right-6 flex justify-between items-center border-t border-slate-100 pt-3">
                                    <div class="text-[10px] text-slate-400 font-medium uppercase">Live Forecast</div>
                                    <div class="bg-blue-50 text-[#2E5BFF] text-[10px] font-bold px-2 py-0.5 rounded">Accuracy 94%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Feature 2: Resource Utilization -->
                <div class="group flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
                    <div class="p-8 pb-0 flex flex-col h-full">
                        <h3 class="text-2xl font-serif font-bold text-slate-900 mb-3">Resource Utilization</h3>
                        <p class="text-slate-600 leading-relaxed mb-6 max-w-md">View a monthly breakdown of bed occupancy and equipment usage from every department. Plus, see a forecast of your capacity needs.</p>
                        <div class="flex items-center text-[#2E5BFF] font-semibold text-sm cursor-pointer mb-8 group/link">
                            <span>Learn more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                        <div class="flex-1 w-full flex items-end justify-center overflow-hidden">
                            <div class="w-full h-64 bg-white rounded-t-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-6 border border-b-0 border-slate-200 flex flex-col justify-end">
                                <div class="flex justify-between items-end mb-2 px-2">
                                    <div class="text-xs font-semibold text-slate-500">ICU Beds</div>
                                    <div class="text-xs font-semibold text-slate-500">OR Rooms</div>
                                </div>
                                <div class="flex justify-around items-end h-40">
                                    <div class="flex space-x-1">
                                        <div class="w-8 bg-[#2E5BFF] rounded-t" style="height: 65%"></div>
                                        <div class="w-8 bg-[#94A3B8] rounded-t" style="height: 40%"></div>
                                    </div>
                                    <div class="flex space-x-1">
                                        <div class="w-8 bg-[#2E5BFF] rounded-t" style="height: 59%"></div>
                                        <div class="w-8 bg-[#94A3B8] rounded-t" style="height: 45%"></div>
                                    </div>
                                    <div class="flex space-x-1">
                                        <div class="w-8 bg-[#2E5BFF] rounded-t" style="height: 80%"></div>
                                        <div class="w-8 bg-[#94A3B8] rounded-t" style="height: 50%"></div>
                                    </div>
                                    <div class="flex space-x-1">
                                        <div class="w-8 bg-[#2E5BFF] rounded-t" style="height: 81%"></div>
                                        <div class="w-8 bg-[#94A3B8] rounded-t" style="height: 55%"></div>
                                    </div>
                                    <div class="flex space-x-1">
                                        <div class="w-8 bg-[#2E5BFF] rounded-t" style="height: 56%"></div>
                                        <div class="w-8 bg-[#94A3B8] rounded-t" style="height: 40%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Feature 3: Live Triage Queue (Full Width) -->
                <div class="md:col-span-2 group flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
                    <div class="p-8 pb-0 flex flex-col h-full">
                        <h3 class="text-2xl font-serif font-bold text-slate-900 mb-3">Live Triage Queue</h3>
                        <p class="text-slate-600 leading-relaxed mb-6 max-w-md">Gain more control with a tool that lets you plan, edit, and execute multiple patient transfers simultaneously, all with real-time status updates.</p>
                        <div class="flex items-center text-[#2E5BFF] font-semibold text-sm cursor-pointer mb-8 group/link">
                            <span>Learn more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                        <div class="flex-1 w-full flex items-end justify-center overflow-hidden">
                            <div class="w-full h-auto min-h-[220px] bg-white rounded-t-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border border-b-0 border-slate-200 overflow-hidden flex flex-col">
                                <div class="flex items-center px-6 py-3 border-b border-slate-100 bg-slate-50/50">
                                    <div class="w-1/4 text-xs font-bold text-slate-400 uppercase">Patient ID</div>
                                    <div class="w-1/4 text-xs font-bold text-slate-400 uppercase">Severity</div>
                                    <div class="w-1/4 text-xs font-bold text-slate-400 uppercase">Status</div>
                                    <div class="w-1/4 text-xs font-bold text-slate-400 uppercase text-right">Action</div>
                                </div>
                                <div class="flex flex-col">
                                    <div class="flex items-center px-6 py-4 border-b border-slate-50">
                                        <div class="w-1/4 text-sm font-bold text-slate-800">P-9281</div>
                                        <div class="w-1/4 text-sm font-medium text-red-600">Level 1 (Critical)</div>
                                        <div class="w-1/4 text-sm text-slate-500 flex items-center">
                                            <div class="w-1.5 h-1.5 rounded-full mr-2 bg-blue-500 animate-pulse"></div>
                                            Waiting Bed
                                        </div>
                                        <div class="w-1/4 text-right">
                                            <button class="text-xs font-semibold text-[#2E5BFF] bg-blue-50 px-3 py-1 rounded-full">Details</button>
                                        </div>
                                    </div>
                                    <div class="flex items-center px-6 py-4 border-b border-slate-50">
                                        <div class="w-1/4 text-sm font-bold text-slate-800">P-9284</div>
                                        <div class="w-1/4 text-sm font-medium text-orange-500">Level 3 (Urgent)</div>
                                        <div class="w-1/4 text-sm text-slate-500 flex items-center">
                                            <div class="w-1.5 h-1.5 rounded-full mr-2 bg-blue-500 animate-pulse"></div>
                                            In Assessment
                                        </div>
                                        <div class="w-1/4 text-right">
                                            <button class="text-xs font-semibold text-[#2E5BFF] bg-blue-50 px-3 py-1 rounded-full">Details</button>
                                        </div>
                                    </div>
                                    <div class="flex items-center px-6 py-4">
                                        <div class="w-1/4 text-sm font-bold text-slate-800">P-9289</div>
                                        <div class="w-1/4 text-sm font-medium text-green-600">Level 4 (Standard)</div>
                                        <div class="w-1/4 text-sm text-slate-500 flex items-center">
                                            <div class="w-1.5 h-1.5 rounded-full mr-2 bg-slate-300"></div>
                                            Discharged
                                        </div>
                                        <div class="w-1/4 text-right">
                                            <button class="text-xs font-semibold text-[#2E5BFF] bg-blue-50 px-3 py-1 rounded-full">Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Feature 4: Smart Handoffs -->
                <div class="group flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
                    <div class="p-8 pb-0 flex flex-col h-full">
                        <h3 class="text-2xl font-serif font-bold text-slate-900 mb-3">Smart Handoffs</h3>
                        <p class="text-slate-600 leading-relaxed mb-6 max-w-md">Access AI-generated shift recaps, critical patient KPIs, and the actual audio of the doctor's handover briefing—all without leaving UnitSync.</p>
                        <div class="flex items-center text-[#2E5BFF] font-semibold text-sm cursor-pointer mb-8 group/link">
                            <span>Learn more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                        <div class="flex-1 w-full flex items-end justify-center overflow-hidden">
                            <div class="w-full h-64 bg-white rounded-t-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-6 border border-b-0 border-slate-200 relative flex flex-col">
                                <div class="flex justify-between items-center mb-6">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                        </div>
                                        <div>
                                            <div class="text-sm font-bold text-slate-900">Morning Handoff</div>
                                            <div class="text-xs text-slate-500">Dr. Sarah • 07:00 AM</div>
                                        </div>
                                    </div>
                                    <div class="text-xs font-mono text-slate-400">14:20</div>
                                </div>

                                <div class="flex items-center justify-between space-x-1 h-12 mb-4 px-2">
                                    ${[40, 60, 30, 80, 50, 90, 40, 60, 70, 40, 30, 60, 40, 80, 50, 70, 40, 20].map((h, i) => `
                                        <div class="w-1.5 rounded-full ${i < 7 ? 'bg-[#2E5BFF]' : 'bg-slate-200'}" style="height: ${h}%; transform: scaleY(${i < 7 ? 1 : 0.8})"></div>
                                    `).join('')}
                                </div>

                                <div class="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <div class="flex items-start space-x-2">
                                        <div class="mt-1 w-2 h-2 rounded-full bg-[#2E5BFF] flex-shrink-0 animate-pulse"></div>
                                        <p class="text-xs text-slate-600 leading-snug">
                                            <span class="font-bold text-slate-800">Summary:</span> ICU capacity at 90%. 3 discharges pending approval. Bed 4 requires cardio consult ASAP.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Feature 5: Staffing Plans -->
                <div class="group flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
                    <div class="p-8 pb-0 flex flex-col h-full">
                        <h3 class="text-2xl font-serif font-bold text-slate-900 mb-3">Staffing Plans</h3>
                        <p class="text-slate-600 leading-relaxed mb-6 max-w-md">Schedule recurring shift patterns for specialized teams. Create automated plans for residents, attendings, and nurses to ensure 24/7 coverage.</p>
                        <div class="flex items-center text-[#2E5BFF] font-semibold text-sm cursor-pointer mb-8 group/link">
                            <span>Learn more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                        <div class="flex-1 w-full flex items-end justify-center overflow-hidden">
                            <div class="w-full h-64 bg-white rounded-t-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-6 border border-b-0 border-slate-200 relative flex flex-col items-center justify-center">
                                <div class="flex items-center space-x-8">
                                    <div class="relative w-32 h-32">
                                        <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
                                            <path class="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4" />
                                            <path class="text-[#2E5BFF]" stroke-dasharray="40, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4" />
                                            <path class="text-purple-500" stroke-dasharray="25, 100" stroke-dashoffset="-40" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4" />
                                        </svg>
                                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                                            <span class="text-2xl font-bold text-slate-900">100%</span>
                                            <span class="text-[10px] uppercase font-bold text-slate-400">Coverage</span>
                                        </div>
                                    </div>

                                    <div class="space-y-3">
                                        <div class="flex items-center text-xs">
                                            <div class="w-3 h-3 rounded bg-[#2E5BFF] mr-2"></div>
                                            <span class="text-slate-600">Nurses (40%)</span>
                                        </div>
                                        <div class="flex items-center text-xs">
                                            <div class="w-3 h-3 rounded bg-purple-500 mr-2"></div>
                                            <span class="text-slate-600">Residents (25%)</span>
                                        </div>
                                        <div class="flex items-center text-xs">
                                            <div class="w-3 h-3 rounded bg-slate-200 mr-2"></div>
                                            <span class="text-slate-600">On Call (35%)</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-6 w-full bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                                    <span class="text-xs font-semibold text-slate-500">Auto-Fill Enabled</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Footer Promo -->
            <div class="mt-24 text-center max-w-2xl mx-auto">
                <div class="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-6 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <h3 class="text-3xl font-serif font-bold text-slate-900 mb-4">
                    And up to 30% reduction in wait times
                </h3>
                <p class="text-slate-600 text-lg mb-2">
                    Take advantage of every efficiency opportunity by making moves without waiting for bottlenecks to clear.
                </p>
                <p class="text-xs text-slate-400 uppercase tracking-wide font-semibold mt-4">
                    Varies by department size.
                </p>
            </div>
        </section>
    `;
}

// Inside Dashboard Component (placeholder for now)
function renderInsideDashboard() {
    const container = document.getElementById('inside-dashboard');
    if (!container) return;

    container.innerHTML = `
        <section class="py-24 bg-slate-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                    Inside the Dashboard
                </h2>
                <p class="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                    Explore the intuitive interface designed for hospital administrators
                </p>
            </div>
        </section>
    `;
}

// Doctor Testimonial Carousel
function renderDoctorTestimonial() {
    const container = document.getElementById('doctor-testimonial');
    if (!container) return;

    const testimonials = [
        {
            quote: "Finally, a solution that fits a public hospital budget but performs like a premium enterprise tool.",
            author: "Dr. Sarah Jenkins",
            role: "Hospital Director, Mercy General"
        },
        {
            quote: "The Morning Brief feature changed how our ED runs. I spend less time on logistics and more time treating patients.",
            author: "James Miller",
            role: "Head of Emergency, St. Luke's"
        },
        {
            quote: "Implementation was a breeze. It didn't replace our EHR; it just made it smarter.",
            author: "Elena Rodriguez",
            role: "Chief Information Officer"
        }
    ];

    let currentIndex = 0;

    function renderCarousel() {
        const testimonial = testimonials[currentIndex];
        container.innerHTML = `
            <section class="py-24 bg-white">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div class="mb-12">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="text-[#2E5BFF] mx-auto mb-6 opacity-20">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                    </div>

                    <blockquote class="text-2xl md:text-3xl font-serif text-slate-900 mb-8 leading-relaxed">
                        "${testimonial.quote}"
                    </blockquote>

                    <div class="mb-8">
                        <p class="font-semibold text-slate-900 text-lg">${testimonial.author}</p>
                        <p class="text-slate-600">${testimonial.role}</p>
                    </div>

                    <div class="flex justify-center items-center space-x-6">
                        <button id="prevTestimonial" class="p-2 rounded-full hover:bg-slate-100 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="m15 18-6-6 6-6"/></svg>
                        </button>

                        <div class="flex space-x-2">
                            ${testimonials.map((_, i) => `
                                <div class="w-2 h-2 rounded-full ${i === currentIndex ? 'bg-[#2E5BFF]' : 'bg-slate-300'}"></div>
                            `).join('')}
                        </div>

                        <button id="nextTestimonial" class="p-2 rounded-full hover:bg-slate-100 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>
            </section>
        `;

        // Attach event listeners
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                renderCarousel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                renderCarousel();
            });
        }
    }

    renderCarousel();
}

// FAQ Section
function renderFAQSection() {
    const container = document.getElementById('faq-section');
    if (!container) return;

    const faqs = [
        {
            question: "Do we need to replace our current ERP or EHR?",
            answer: "No. UnitSync acts as an intelligent layer that integrates bi-directionally with your existing systems (Epic, Cerner, etc.) to enhance their capabilities without replacement."
        },
        {
            question: "Is this affordable for public hospitals?",
            answer: "Yes. Unlike enterprise suites like SAP or IBM Watson, UnitSync is priced specifically for mid-sized public sector budgets, with no hidden implementation fees."
        },
        {
            question: "How long does implementation take?",
            answer: "Our standardized Pilot Phase allows for rapid deployment in Emergency Departments. Most hospitals are live within 4-6 weeks and see ROI within the first quarter."
        },
        {
            question: "Is data handling HIPAA & GDPR compliant?",
            answer: "Absolutely. We maintain the highest security standards with end-to-end encryption, regular audits, and full compliance with HIPAA, GDPR, and local data residency laws."
        },
        {
            question: "Can I customize the dashboard views?",
            answer: "Yes. Every department head can configure their own 'Control Tower' view to track the KPIs that matter most to their specific workflow and staff."
        },
        {
            question: "What kind of support do you offer?",
            answer: "We provide 24/7 dedicated support for critical issues, along with a dedicated Success Manager who helps you optimize workflows during and after onboarding."
        },
        {
            question: "Does it work on mobile devices?",
            answer: "UnitSync is fully responsive and secure on mobile. Doctors can access schedules, handoff notes, and alerts directly from their secure hospital-issued tablets or phones."
        },
        {
            question: "How do updates work?",
            answer: "As a SaaS platform, updates are automatic and seamless. You always have access to the latest features and security patches without any downtime or IT maintenance."
        }
    ];

    container.innerHTML = `
        <section class="py-24 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-16">
                    Frequently Asked Questions
                </h2>

                <div class="grid md:grid-cols-2 gap-x-16 gap-y-10">
                    ${faqs.map((faq, index) => `
                        <div class="flex flex-col items-start">
                            <button
                                class="faq-toggle flex items-start text-left w-full group focus:outline-none"
                                data-index="${index}"
                                aria-expanded="false"
                            >
                                <div class="flex-shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center mr-4 transition-colors duration-200 bg-slate-900 group-hover:bg-slate-700 faq-icon-container-${index}">
                                    <span class="faq-icon text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </span>
                                </div>
                                <span class="text-xl font-serif font-bold text-slate-900 leading-tight">
                                    ${faq.question}
                                </span>
                            </button>

                            <div id="faq-answer-${index}" class="hidden overflow-hidden transition-all duration-300 ease-in-out mt-4">
                                <p class="text-slate-600 leading-relaxed pl-10 text-base">
                                    ${faq.answer}
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="mt-16 flex flex-col items-center">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold text-slate-900 mb-2">Need more technical details?</h3>
                        <p class="text-slate-600">Download our comprehensive technical documentation</p>
                    </div>
                    <a href="/UnitSync-Technical-Information.pdf" download class="inline-flex items-center justify-center bg-slate-900 text-white hover:bg-slate-800 font-semibold py-3 px-6 rounded-lg transition-colors text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                        Download Technical PDF
                    </a>
                </div>
            </div>
        </section>
    `;

    // Initialize FAQ accordion
    initFAQAccordion();
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    renderDashboardMockup();
    renderFeaturesGrid();
    renderInsideDashboard();
    renderDoctorTestimonial();
    renderFAQSection();
});
