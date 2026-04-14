export type Section = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number; // Estimated reading/interactive time
};

export type Chapter = {
  id: string;
  title: string;
  description: string;
  sections: Section[];
};

export type Part = {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
};

export const curriculum: Part[] = [
  {
    id: "part-1",
    title: "Part I: Foundations of Data Systems",
    description: "The fundamental ideas that underpin the design of data-intensive applications.",
    chapters: [
      {
        id: "chapter-1",
        title: "Reliable, Scalable, and Maintainable Applications",
        description: "Understanding the core requirements of data systems: Reliability, Scalability, and Maintainability.",
        sections: [
          { id: "thinking-about-data-systems", title: "Thinking About Data Systems", description: "Why we call them 'data systems' and not just databases.", durationMinutes: 5 },
          { id: "reliability", title: "Reliability", description: "Making systems work correctly even when things go wrong.", durationMinutes: 10 },
          { id: "scalability", title: "Scalability", description: "Coping with increased load.", durationMinutes: 15 },
          { id: "maintainability", title: "Maintainability", description: "Making life easier for engineering and operations.", durationMinutes: 10 },
        ],
      },
      {
        id: "chapter-2",
        title: "Data Models and Query Languages",
        description: "How data is structured and accessed.",
        sections: [
          { id: "relational-vs-document", title: "Relational vs Document Model", description: "The debate between SQL and NoSQL.", durationMinutes: 15 },
          { id: "query-languages", title: "Query Languages for Data", description: "Declarative vs Imperative querying.", durationMinutes: 10 },
          { id: "graph-like-data-models", title: "Graph-Like Data Models", description: "Handling highly connected data.", durationMinutes: 15 },
        ],
      },
      {
        id: "chapter-3",
        title: "Storage and Retrieval",
        description: "How databases store data on disk and find it again.",
        sections: [
          { id: "data-structures", title: "Data Structures That Power Your Database", description: "Hash Indexes, SSTables, LSM-Trees, and B-Trees.", durationMinutes: 20 },
          { id: "transaction-processing-or-analytics", title: "Transaction Processing or Analytics?", description: "OLTP vs OLAP.", durationMinutes: 10 },
          { id: "column-oriented-storage", title: "Column-Oriented Storage", description: "Optimizing for analytics workloads.", durationMinutes: 15 },
        ],
      },
      {
        id: "chapter-4",
        title: "Encoding and Evolution",
        description: "Formats for encoding data and handling schema changes.",
        sections: [
          { id: "formats-for-encoding-data", title: "Formats for Encoding Data", description: "JSON, XML, Thrift, Protocol Buffers, Avro.", durationMinutes: 15 },
          { id: "modes-of-dataflow", title: "Modes of Dataflow", description: "Dataflow through databases, services, and asynchronous message passing.", durationMinutes: 15 },
        ],
      },
    ],
  },
  {
    id: "part-2",
    title: "Part II: Distributed Data",
    description: "Moving from a single machine to multiple machines.",
    chapters: [
      {
        id: "chapter-5",
        title: "Replication",
        description: "Keeping a copy of the same data on several nodes.",
        sections: [
          { id: "leaders-and-followers", title: "Leaders and Followers", description: "Synchronous vs Asynchronous, Handling Outages.", durationMinutes: 15 },
          { id: "replication-lag", title: "Problems with Replication Lag", description: "Read-your-writes, Monotonic reads, Consistent prefix reads.", durationMinutes: 15 },
          { id: "multi-leader", title: "Multi-Leader Replication", description: "Handling writes on multiple nodes.", durationMinutes: 15 },
          { id: "leaderless", title: "Leaderless Replication", description: "Dynamo-style databases and Quorums.", durationMinutes: 15 },
        ],
      },
      {
        id: "chapter-6",
        title: "Partitioning",
        description: "Breaking a large dataset into smaller subsets.",
        sections: [
          { id: "partitioning-kv", title: "Partitioning Key-Value Data", description: "Key Range vs Hash Partitioning.", durationMinutes: 15 },
          { id: "partitioning-indexes", title: "Partitioning and Secondary Indexes", description: "Document-partitioned vs Term-partitioned indexes.", durationMinutes: 15 },
          { id: "rebalancing", title: "Rebalancing Partitions", description: "Moving load between nodes.", durationMinutes: 10 },
        ],
      },
      {
        id: "chapter-7",
        title: "Transactions",
        description: "Grouping several reads and writes into a logical unit.",
        sections: [
          { id: "acid", title: "The Meaning of ACID", description: "Atomicity, Consistency, Isolation, Durability.", durationMinutes: 10 },
          { id: "weak-isolation", title: "Weak Isolation Levels", description: "Read Committed, Snapshot Isolation, Lost Updates.", durationMinutes: 20 },
          { id: "serializability", title: "Serializability", description: "The strongest isolation guarantee.", durationMinutes: 15 },
        ],
      },
      {
        id: "chapter-8",
        title: "The Trouble with Distributed Systems",
        description: "Everything that can go wrong in a distributed system.",
        sections: [
          { id: "faults", title: "Faults and Partial Failures", description: "Cloud computing vs Supercomputing.", durationMinutes: 10 },
          { id: "unreliable-networks", title: "Unreliable Networks", description: "Timeouts and unbounded delays.", durationMinutes: 15 },
          { id: "unreliable-clocks", title: "Unreliable Clocks", description: "Monotonic vs Time-of-day clocks.", durationMinutes: 15 },
          { id: "knowledge", title: "Knowledge, Truth, and Lies", description: "The truth is defined by the majority.", durationMinutes: 15 },
        ],
      },
      {
        id: "chapter-9",
        title: "Consistency and Consensus",
        description: "Getting all nodes to agree on something.",
        sections: [
          { id: "consistency-guarantees", title: "Consistency Guarantees", description: "Linearizability.", durationMinutes: 15 },
          { id: "ordering", title: "Ordering Guarantees", description: "Ordering and Causality.", durationMinutes: 15 },
          { id: "consensus", title: "Distributed Transactions and Consensus", description: "Atomic commit, 2PC, Fault-Tolerant Consensus.", durationMinutes: 20 },
        ],
      },
    ],
  },
  {
    id: "part-3",
    title: "Part III: Derived Data",
    description: "Systems that store and process data.",
    chapters: [
      {
        id: "chapter-10",
        title: "Batch Processing",
        description: "Processing large amounts of data offline.",
        sections: [
          { id: "unix-tools", title: "Batch Processing with Unix Tools", description: "Simple log analysis with awk, sort, uniq.", durationMinutes: 10 },
          { id: "mapreduce", title: "MapReduce and Distributed Filesystems", description: "HDFS, Job Execution, Joins.", durationMinutes: 20 },
          { id: "beyond-mapreduce", title: "Beyond MapReduce", description: "Dataflow engines (Spark, Flink).", durationMinutes: 15 },
        ],
      },
      {
        id: "chapter-11",
        title: "Stream Processing",
        description: "Processing data as it arrives.",
        sections: [
          { id: "event-streams", title: "Transmitting Event Streams", description: "Messaging systems and logs.", durationMinutes: 15 },
          { id: "databases-and-streams", title: "Databases and Streams", description: "Change Data Capture (CDC) and Event Sourcing.", durationMinutes: 15 },
          { id: "processing-streams", title: "Processing Streams", description: "Complex Event Processing, Stream Analytics, Time Windows.", durationMinutes: 20 },
        ],
      },
      {
        id: "chapter-12",
        title: "The Future of Data Systems",
        description: "Where are we going from here?",
        sections: [
          { id: "data-integration", title: "Data Integration", description: "Combining specialized tools.", durationMinutes: 15 },
          { id: "unbundling", title: "Unbundling Databases", description: "Composing storage technologies.", durationMinutes: 15 },
          { id: "correctness", title: "Aiming for Correctness", description: "End-to-end arguments, constraints, and trust.", durationMinutes: 15 },
        ],
      },
    ],
  },
];

export const getSectionData = (slug: string) => {
  for (const part of curriculum) {
    for (const chapter of part.chapters) {
      const sectionIndex = chapter.sections.findIndex((s) => s.id === slug);
      if (sectionIndex !== -1) {
        return {
          part,
          chapter,
          section: chapter.sections[sectionIndex],
          prev: chapter.sections[sectionIndex - 1] || null, // Logic could be improved to cross chapters
          next: chapter.sections[sectionIndex + 1] || null, // Logic could be improved to cross chapters
        };
      }
    }
  }
  return null;
};

export const getNavigation = (slug: string) => {
  const flatSections: { part: Part; chapter: Chapter; section: Section }[] = [];

  for (const part of curriculum) {
    for (const chapter of part.chapters) {
      for (const section of chapter.sections) {
        flatSections.push({ part, chapter, section });
      }
    }
  }

  const currentIndex = flatSections.findIndex((s) => s.section.id === slug);

  if (currentIndex === -1) return null;

  return {
    current: flatSections[currentIndex],
    prev: flatSections[currentIndex - 1] || null,
    next: flatSections[currentIndex + 1] || null,
  };
};
