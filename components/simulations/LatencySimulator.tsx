"use client";

import { useState } from "react";
import { Activity } from "lucide-react";

export function LatencySimulator() {
  const [rps, setRps] = useState(50); // Requests per second
  const [processingTime, setProcessingTime] = useState(15); // ms per request
  const [servers, setServers] = useState(1);

  // Simplified Model: M/M/c queueing theory approximation or just basic math for illustration
  // Capacity per server = 1000ms / processingTime
  const capacityPerServer = 1000 / processingTime;
  const totalCapacity = capacityPerServer * servers;
  const utilization = rps / totalCapacity;

  // Calculate queue delay using simple formula: processingTime / (1 - utilization)
  // If utilization >= 1, system is overloaded (infinite latency theoretically)
  let avgLatency = processingTime;
  let status = "Healthy";

  if (utilization >= 1) {
    avgLatency = 9999; // Overloaded
    status = "Overloaded";
  } else {
    // Basic M/M/1 queuing formula: Wait Time = Service Time / (1 - Utilization)
    avgLatency = processingTime / (1 - utilization);
  }

  return (
    <div className="my-8 p-6 border rounded-xl bg-card shadow-sm space-y-6">
      <div className="flex items-center gap-2 border-b pb-4">
        <Activity className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Interactive: Load vs. Latency</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Controls */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between">
              Incoming Traffic (RPS)
              <span className="text-muted-foreground">{rps} req/s</span>
            </label>
            <input
              type="range"
              min="10"
              max="200"
              value={rps}
              onChange={(e) => setRps(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between">
              Processing Time (ms)
              <span className="text-muted-foreground">{processingTime} ms</span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={processingTime}
              onChange={(e) => setProcessingTime(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between">
              Number of Servers
              <span className="text-muted-foreground">{servers}</span>
            </label>
            <div className="flex gap-2">
               {[1, 2, 3, 4].map(n => (
                 <button
                    key={n}
                    onClick={() => setServers(n)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      servers === n
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                 >
                   {n} Server{n > 1 ? 's' : ''}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-secondary/30 rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">System Utilization</div>
            <div className={`text-2xl font-bold ${utilization > 0.9 ? 'text-red-500' : utilization > 0.7 ? 'text-amber-500' : 'text-green-500'}`}>
              {(utilization * 100).toFixed(1)}%
            </div>
            <div className="w-full bg-secondary h-2 rounded-full mt-2 overflow-hidden w-32 mx-auto">
              <div
                className={`h-full transition-all duration-300 ${utilization > 0.9 ? 'bg-red-500' : 'bg-primary'}`}
                style={{ width: `${Math.min(utilization * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Avg Latency</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-extrabold tracking-tight">
                 {avgLatency >= 9999 ? "∞" : Math.round(avgLatency)}
              </span>
              <span className="text-sm font-medium text-muted-foreground">ms</span>
            </div>
            {avgLatency > processingTime * 2 && avgLatency < 9999 && (
              <div className="text-xs text-amber-500 mt-1 font-medium">
                Queuing Delay: +{Math.round(avgLatency - processingTime)}ms
              </div>
            )}
            {status === "Overloaded" && (
              <div className="text-xs text-red-500 mt-1 font-bold animate-pulse">
                SYSTEM OVERLOADED
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground italic border-t pt-4">
        <strong>Takeaway:</strong> As utilization approaches 100%, queueing causes latency to spike exponentially. This is why &ldquo;scalability&rdquo; often means keeping utilization low enough (e.g., 70%) to absorb spikes.
      </p>
    </div>
  );
}
