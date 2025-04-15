
// Render the appropriate view based on app state
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{styles}</style>
      {!selectedTopic && renderTopicSelection()}
      {selectedTopic && !selectedCard && renderFlashcardList()}
      {selectedTopic && selectedCard && renderFlashcardDetail()}
    </div>
  );import React, { useState, useEffect } from 'react';

// Add CSS for flip card functionality
const styles = `
  .perspective-lg {
    perspective: 1000px;
  }
  
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;

const App = () => {
  const [topics, setTopics] = useState([
    { id: 1, name: 'Arrays and Hashing', problems: 1, available: true },
    { id: 2, name: 'Two Pointers', problems: 1, available: true },
    { id: 3, name: 'Stack', problems: 0, available: false },
    { id: 4, name: 'Binary Search', problems: 0, available: false },
    { id: 5, name: 'Sliding Window', problems: 0, available: false },
    { id: 6, name: 'Linked List', problems: 0, available: false },
    { id: 7, name: 'Trees', problems: 0, available: false },
    { id: 8, name: 'Tries', problems: 3, available: true },
    { id: 9, name: 'Backtracking', problems: 0, available: false },
    { id: 10, name: 'Heap/Priority Queue', problems: 0, available: false },
    { id: 11, name: 'Intervals', problems: 0, available: false },
    { id: 12, name: 'Greedy', problems: 0, available: false },
    { id: 13, name: 'Advanced Graphs', problems: 0, available: false },
    { id: 14, name: 'Graphs', problems: 0, available: false },
    { id: 15, name: '1-D Dynamic Programming', problems: 0, available: false },
    { id: 16, name: '2-D Dynamic Programming', problems: 0, available: false },
    { id: 17, name: 'Bit Manipulation', problems: 0, available: false },
    { id: 18, name: 'Math & Geometry', problems: 0, available: false },
  ]);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  
  // Sample Trie flashcards based on your uploaded file
  const trieFlashcards = [
    {
      id: 1,
      title: "Implement Trie (Prefix Tree)",
      question: "Design a data structure that supports inserting, searching, and prefix matching for strings",
      hint: "Think about how to represent character-by-character traversal using nested dictionaries",
      oneLiner: "Use a nested dictionary where each node is a character map, ending with a special end marker.",
      simpleExplanation: "We build a tree where each letter has its own branch.\nWe follow each letter step by step when adding a word.\nA special symbol tells us when a word ends.",
      mnemonics: [
        "\"Start root\" → self.root = {}",
        "\"Insert char by char\" → node = node.setdefault(char, {})",
        "\"Mark end of word\" → node['#'] = True"
      ],
      code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.isWord = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.isWord = True

    def search(self, word):
        node = self._find(word)
        return node is not None and node.isWord

    def startsWith(self, prefix):
        return self._find(prefix) is not None

    def _find(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node`,
      timeComplexity: "insert: O(L), search: O(L), startsWith: O(L) where L is word length",
      spaceComplexity: "O(N) where N is total characters inserted"
    },
    {
      id: 2,
      title: "Design Add and Search Words Data Structure",
      question: "Implement a data structure that can add words and search for words with wildcards",
      hint: "How would you handle a '.' character that can match any letter during search?",
      oneLiner: "Extend Trie with DFS to handle wildcards (.) during search.",
      simpleExplanation: "We store words in a special tree (Trie).\nWhen searching, we can use . to mean any letter.\nWe check all possible paths for matches.",
      mnemonics: [
        "\"Dot means explore\" → if char == '.': try all children",
        "\"End match\" → if at end and '#' in node: return True",
        "\"DFS search\" → searchHelper(word, index, node)"
      ],
      code: `class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node['#'] = True  # End of word

    def search(self, word):
        def dfs(node, i):
            if i == len(word):
                return '#' in node
            if word[i] == '.':
                return any(dfs(child, i + 1) for child in node if child != '#')
            return word[i] in node and dfs(node[word[i]], i + 1)

        return dfs(self.root, 0)`,
      timeComplexity: "addWord: O(L), search: Worst case O(26^L) if all characters are .",
      spaceComplexity: "O(N) where N is total characters inserted"
    },
    {
      id: 3,
      title: "Word Search II",
      question: "Given an m×n board of characters and a list of words, find all words that can be formed on the board",
      hint: "Could you use a Trie to quickly check if a prefix exists in the word list during board traversal?",
      oneLiner: "Build a Trie of words, then DFS through board to match prefixes.",
      simpleExplanation: "We put all words into a search tree (Trie).\nThen we walk around the board letter by letter.\nIf we match a word path, we add it to our answers.",
      mnemonics: [
        "\"Build Trie first\" → for word in words: insert(word)",
        "\"Explore neighbors\" → dfs(i, j, node)",
        "\"Found word\" → if '#' in node: add to result"
      ],
      code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None  # Store word at the end

class Solution:
    def findWords(self, board, words):
        root = TrieNode()

        # Build Trie
        for word in words:
            node = root
            for ch in word:
                if ch not in node.children:
                    node.children[ch] = TrieNode()
                node = node.children[ch]
            node.word = word

        res = []
        rows, cols = len(board), len(board[0])

        def dfs(r, c, node):
            char = board[r][c]
            if char not in node.children:
                return
            nxt_node = node.children[char]
            if nxt_node.word:
                res.append(nxt_node.word)
                nxt_node.word = None  # Avoid duplicates

            board[r][c] = '#'
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                    dfs(nr, nc, nxt_node)
            board[r][c] = char

        for r in range(rows):
            for c in range(cols):
                dfs(r, c, root)

        return res`,
      timeComplexity: "Building Trie: O(W * L), DFS Search: O(M * N * 4^L)",
      spaceComplexity: "O(W * L) for Trie + O(L) recursion depth"
    }
  ];

  // Mock data for Arrays topic
  const arrayFlashcards = [
    {
      id: 1,
      title: "Two Sum",
      question: "Given an array of integers and a target, return indices of two numbers that add up to the target",
      hint: "Can you use extra space to improve time complexity? Think hash tables.",
      oneLiner: "Use a hash map to store value-to-index mapping",
      simpleExplanation: "We keep track of numbers we've seen already.\nWhen we see a new number, we check if its matching pair is in our list.\nIf it is, we found our answer!",
      mnemonics: [
        "\"Map values to indices\" → seen = {}",
        "\"Check for complement\" → target - num in seen",
        "\"Store as you go\" → seen[num] = index"
      ],
      code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      timeComplexity: "O(n) - single pass through array",
      spaceComplexity: "O(n) - hash map can store all elements"
    }
  ];

  useEffect(() => {
    // In a real app, you would fetch data for selected topic from an API or file
    if (selectedTopic) {
      if (selectedTopic.id === 8) { // Tries
        setFlashcards(trieFlashcards);
      } else if (selectedTopic.id === 1) { // Arrays
        setFlashcards(arrayFlashcards);
      } else {
        setFlashcards([]);
      }
      
      // Reset flipped cards state when changing topics
      setFlippedCards({});
    }
  }, [selectedTopic]);

  const handleTopicClick = (topic) => {
    if (topic.available) {
      setSelectedTopic(topic);
      setSelectedCard(null);
    }
  };

  const handleBackClick = () => {
    if (selectedCard) {
      setSelectedCard(null);
    } else {
      setSelectedTopic(null);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Main page with topic buttons
  const renderTopicSelection = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">LeetCode Flashcards</h1>
      <h2 className="text-xl mb-4">Select a Topic</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(topic => (
          <div 
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            className={`p-4 rounded-lg cursor-pointer ${
              topic.available ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100 cursor-not-allowed'
            }`}
          >
            <h3 className="font-bold">{topic.name}</h3>
            <p className="text-sm">
              {topic.problems} problem{topic.problems !== 1 ? 's' : ''}
              {!topic.available && ' (Coming soon)'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // List of flashcards for selected topic
  const renderFlashcardList = () => (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBackClick}
          className="mr-4 bg-gray-200 hover:bg-gray-300 p-2 rounded"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{selectedTopic.name} Flashcards</h1>
      </div>
      
      {flashcards.length === 0 ? (
        <p>No flashcards available for this topic yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flashcards.map(card => {
            const isFlipped = flippedCards[card.id];
            return (
              <div 
                key={card.id} 
                className="h-64 perspective-lg"
              >
                <div 
                  className={`relative h-full w-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                  onClick={() => setFlippedCards({...flippedCards, [card.id]: !isFlipped})}
                >
                  {/* Front side - Question and Hint */}
                  <div className="absolute w-full h-full bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-md backface-hidden cursor-pointer">
                    <div className="flex flex-col h-full">
                      <h3 className="font-bold text-lg text-blue-700 mb-4">{card.title}</h3>
                      <div className="flex-grow mb-4">
                        <h4 className="font-medium mb-2">Question:</h4>
                        <p className="text-sm">{card.question}</p>
                      </div>
                      <div className="mt-auto border-t border-blue-200 pt-3">
                        <h4 className="font-medium text-sm mb-1">Hint:</h4>
                        <p className="text-sm italic text-gray-600">{card.hint}</p>
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-400">Click to flip</p>
                    </div>
                  </div>
                  
                  {/* Back side - Code, Mnemonics, Explanations */}
                  <div className="absolute w-full h-full bg-white border border-gray-200 rounded-lg p-4 shadow-md backface-hidden rotate-y-180 overflow-auto cursor-pointer">
                    <div className="flex flex-col h-full">
                      <h3 className="font-bold text-lg text-gray-800">{card.title}</h3>
                      
                      <div className="flex-grow overflow-auto">
                        <div className="mb-3">
                          <h4 className="font-medium text-sm">In One Line:</h4>
                          <p className="text-sm">{card.oneLiner}</p>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="font-medium text-sm">Simple Explanation:</h4>
                          <p className="text-xs whitespace-pre-line">{card.simpleExplanation}</p>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="font-medium text-sm">Mnemonics:</h4>
                          <ul className="text-xs list-disc pl-4">
                            {card.mnemonics.map((mnemonic, index) => (
                              <li key={index}>{mnemonic}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <button 
                        className="mt-auto block w-full py-1 bg-green-100 text-green-800 rounded text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(card);
                        }}
                      >
                        View Full Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // Detailed view of a single flashcard
  const renderFlashcardDetail = () => (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBackClick}
          className="mr-4 bg-gray-200 hover:bg-gray-300 p-2 rounded"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">{selectedCard.title}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Question:</h2>
          <p>{selectedCard.question}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">In One Line:</h2>
          <p>{selectedCard.oneLiner}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Simple Explanation:</h2>
          <p className="whitespace-pre-line">{selectedCard.simpleExplanation}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Mnemonics:</h2>
          <ul className="list-disc pl-6">
            {selectedCard.mnemonics.map((mnemonic, index) => (
              <li key={index}>{mnemonic}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-800 text-white p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Code Implementation:</h2>
        <pre className="overflow-x-auto text-sm">
          <code>{selectedCard.code}</code>
        </pre>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-2">
          <span className="font-semibold">Time Complexity:</span> {selectedCard.timeComplexity}
        </div>
        <div>
          <span className="font-semibold">Space Complexity:</span> {selectedCard.spaceComplexity}
        </div>
      </div>
    </div>
  );


};

export default App;
