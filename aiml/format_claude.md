# 🤖 AI/ML Learning Pathway & Implementation Guide
## StudyFocus AI - From Zero to Hero

### 📋 Table of Contents
1. [Learning Prerequisites](#learning-prerequisites)
2. [Step-by-Step Learning Path](#step-by-step-learning-path)
3. [Project Structure](#project-structure)
4. [Core AI Features Implementation](#core-ai-features-implementation)
5. [Advanced AI Features](#advanced-ai-features)
6. [Cool AI Features to Add](#cool-ai-features-to-add)
7. [Implementation Timeline](#implementation-timeline)
8. [Resources & Tools](#resources--tools)
9. [Best Practices](#best-practices)

---

## 🎯 Learning Prerequisites

### Basic Knowledge Needed
- **Python Programming** (Variables, Functions, Classes, Loops)
- **Basic Statistics** (Mean, Median, Standard Deviation)
- **JSON & API Concepts**
- **Basic Mathematics** (Algebra, Basic Calculus helpful but not required)

### Don't Worry About These (Yet!)
- ❌ Complex Mathematical Formulas
- ❌ Deep Learning Theory
- ❌ Advanced Statistics
- ❌ Research Papers

---

## 📚 Step-by-Step Learning Path

### 🌱 **Phase 1: Foundation (Week 1-2)**

#### Day 1-3: Python for AI Basics
```python
# Start with these concepts:
# 1. Lists, Dictionaries, Functions
# 2. Working with JSON data
# 3. Making API calls with requests library
# 4. Basic file handling

# Example: Simple data processing
students = [
    {"name": "Alice", "focus_time": 45, "breaks": 3},
    {"name": "Bob", "focus_time": 30, "breaks": 5}
]

def calculate_focus_score(student):
    base_score = student["focus_time"]
    penalty = student["breaks"] * 2
    return max(0, base_score - penalty)
```

#### Day 4-7: Introduction to AI APIs
```python
# Learn to use AI APIs before building your own models
# Start with OpenAI API, Hugging Face API

import openai

def generate_mcq_question(topic):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f"Create a multiple choice question about {topic}"}
        ]
    )
    return response.choices[0].message.content
```

**📖 Learning Resources:**
- [Python Crash Course](https://automatetheboringstuff.com/) - Free online book
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Hugging Face Transformers](https://huggingface.co/transformers/)

### 🌿 **Phase 2: Basic AI Implementation (Week 3-4)**

#### Understanding AI Services Architecture
```
Your App -> AI Service -> AI Model -> Response -> Your App
```

#### Build Your First AI Feature: MCQ Generator
```python
# File: ai-services/mcq-generator/src/services/mcqService.py

import openai
import json
from typing import List, Dict

class MCQGenerator:
    def __init__(self, api_key: str):
        openai.api_key = api_key
    
    def generate_questions(self, topic: str, difficulty: str, count: int = 5) -> List[Dict]:
        prompt = f"""
        Create {count} multiple choice questions about {topic} at {difficulty} level.
        Format as JSON array with: question, options (A,B,C,D), correct_answer, explanation
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        
        return json.loads(response.choices[0].message.content)
```

**📖 Learning Resources:**
- [Flask API Tutorial](https://flask.palletsprojects.com/en/2.3.x/tutorial/)
- [Working with JSON in Python](https://realpython.com/python-json/)

### 🌳 **Phase 3: Intermediate AI Features (Week 5-6)**

#### Learn Basic Machine Learning Concepts
```python
# Understanding patterns in user data
import pandas as pd
from sklearn.linear_model import LinearRegression

# Predict user's optimal study time based on historical data
def predict_optimal_study_time(user_data):
    # user_data: [focus_time, break_count, performance_score]
    model = LinearRegression()
    
    # X = features (focus_time, break_count)
    # y = target (performance_score)
    X = user_data[['focus_time', 'break_count']]
    y = user_data['performance_score']
    
    model.fit(X, y)
    
    # Predict optimal study time for new session
    return model.predict([[45, 2]])[0]  # 45 min focus, 2 breaks
```

#### Build Interview Bot with Context
```python
# File: ai-services/interview-bot/src/services/interviewService.py

class InterviewBot:
    def __init__(self):
        self.conversation_history = []
        self.user_performance = {}
    
    def conduct_interview(self, topic: str, user_answer: str = None):
        if user_answer:
            # Evaluate previous answer
            score = self.evaluate_answer(user_answer)
            self.user_performance['last_score'] = score
        
        # Generate next question based on performance
        difficulty = self.adjust_difficulty()
        question = self.generate_question(topic, difficulty)
        
        return {
            'question': question,
            'feedback': self.get_feedback() if user_answer else None,
            'score': self.user_performance.get('last_score', 0)
        }
    
    def evaluate_answer(self, answer: str) -> float:
        # Use AI to evaluate answer quality
        prompt = f"Rate this answer from 0-10: {answer}"
        # Implementation using OpenAI API
        pass
```

**📖 Learning Resources:**
- [Scikit-learn Tutorial](https://scikit-learn.org/stable/tutorial/index.html)
- [Pandas for Data Analysis](https://pandas.pydata.org/docs/user_guide/10min.html)

### 🌲 **Phase 4: Advanced AI Features (Week 7-8)**

#### Build Smart Recommendation System
```python
# File: ai-services/recommendation-engine/src/services/recommendationService.py

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class StudyRecommendationEngine:
    def __init__(self):
        self.user_profiles = {}
        self.content_features = {}
    
    def build_user_profile(self, user_id: str, interactions: List[Dict]):
        """Build user profile based on study patterns"""
        profile = {
            'preferred_subjects': [],
            'optimal_session_length': 0,
            'difficulty_preference': 'medium',
            'learning_style': 'visual'  # visual, auditory, kinesthetic
        }
        
        # Analyze user interactions to build profile
        for interaction in interactions:
            # Process focus sessions, quiz performances, etc.
            pass
        
        self.user_profiles[user_id] = profile
        return profile
    
    def recommend_content(self, user_id: str, available_content: List[Dict]) -> List[Dict]:
        """Recommend study content based on user profile"""
        user_profile = self.user_profiles.get(user_id)
        
        recommendations = []
        for content in available_content:
            similarity_score = self.calculate_content_similarity(user_profile, content)
            if similarity_score > 0.7:  # Threshold
                recommendations.append({
                    'content': content,
                    'score': similarity_score,
                    'reason': self.explain_recommendation(user_profile, content)
                })
        
        return sorted(recommendations, key=lambda x: x['score'], reverse=True)
```

**📖 Learning Resources:**
- [Recommendation Systems Tutorial](https://www.kaggle.com/learn/intro-to-machine-learning)
- [NumPy Quickstart](https://numpy.org/doc/stable/user/quickstart.html)

---

## 📁 Project Structure

```
ai-ml/
├── 📁 services/                           # Microservices Architecture
│   ├── 📁 mcq-generator/
│   │   ├── src/
│   │   │   ├── models/
│   │   │   │   ├── question_generator.py      # Core MCQ generation logic
│   │   │   │   ├── difficulty_classifier.py   # Classify question difficulty
│   │   │   │   └── topic_analyzer.py          # Analyze content topics
│   │   │   ├── services/
│   │   │   │   ├── mcq_service.py             # Main service logic
│   │   │   │   ├── content_processor.py       # Process input content
│   │   │   │   └── answer_validator.py        # Validate generated answers
│   │   │   ├── utils/
│   │   │   │   ├── prompts.py                 # AI prompts templates
│   │   │   │   └── formatters.py              # Format responses
│   │   │   └── app.py                         # Flask/FastAPI app
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   └── README.md
│   │
│   ├── 📁 interview-bot/
│   │   ├── src/
│   │   │   ├── models/
│   │   │   │   ├── question_generator.py      # Interview questions
│   │   │   │   ├── answer_evaluator.py        # Evaluate responses
│   │   │   │   ├── difficulty_adapter.py      # Adapt question difficulty
│   │   │   │   └── conversation_manager.py    # Manage conversation flow
│   │   │   ├── services/
│   │   │   │   ├── interview_service.py       # Main interview logic
│   │   │   │   ├── speech_service.py          # Speech-to-text/text-to-speech
│   │   │   │   └── feedback_service.py        # Generate feedback
│   │   │   └── app.py
│   │   └── requirements.txt
│   │
│   ├── 📁 problem-solver/
│   │   ├── src/
│   │   │   ├── models/
│   │   │   │   ├── math_solver.py             # Mathematical problem solving
│   │   │   │   ├── coding_solver.py           # Programming problem solving
│   │   │   │   ├── physics_solver.py          # Physics problems
│   │   │   │   └── step_generator.py          # Generate solution steps
│   │   │   ├── services/
│   │   │   │   ├── solver_service.py          # Main solving logic
│   │   │   │   ├── explanation_service.py     # Explain solutions
│   │   │   │   └── visualization_service.py   # Create visual explanations
│   │   │   └── app.py
│   │   └── requirements.txt
│   │
│   ├── 📁 focus-analyzer/
│   │   ├── src/
│   │   │   ├── models/
│   │   │   │   ├── attention_predictor.py     # Predict attention patterns
│   │   │   │   ├── behavior_analyzer.py       # Analyze study behavior
│   │   │   │   ├── performance_predictor.py   # Predict performance
│   │   │   │   └── optimization_engine.py     # Optimize study schedule
│   │   │   ├── services/
│   │   │   │   ├── focus_service.py           # Focus analysis service
│   │   │   │   ├── recommendation_service.py  # Study recommendations
│   │   │   │   └── insights_service.py        # Generate insights
│   │   │   └── app.py
│   │   └── requirements.txt
│   │
│   ├── 📁 content-analyzer/
│   │   ├── src/
│   │   │   ├── models/
│   │   │   │   ├── text_summarizer.py         # Summarize text content
│   │   │   │   ├── video_analyzer.py          # Analyze video content
│   │   │   │   ├── concept_extractor.py       # Extract key concepts
│   │   │   │   └── difficulty_estimator.py    # Estimate content difficulty
│   │   │   ├── services/
│   │   │   │   ├── summary_service.py         # Content summarization
│   │   │   │   ├── transcription_service.py   # Video transcription
│   │   │   │   └── note_service.py            # Generate study notes
│   │   │   └── app.py
│   │   └── requirements.txt
│   │
│   └── 📁 recommendation-engine/
│       ├── src/
│       │   ├── models/
│       │   │   ├── collaborative_filter.py    # User-based recommendations
│       │   │   ├── content_filter.py          # Content-based filtering
│       │   │   ├── hybrid_model.py            # Hybrid recommendation
│       │   │   └── learning_path_optimizer.py # Optimize learning paths
│       │   ├── services/
│       │   │   ├── recommendation_service.py  # Main recommendation logic
│       │   │   ├── personalization_service.py # Personalize content
│       │   │   └── analytics_service.py       # Recommendation analytics
│       │   └── app.py
│       └── requirements.txt
│
├── 📁 shared/                             # Shared utilities
│   ├── 📁 utils/
│   │   ├── ai_clients.py                      # AI API clients (OpenAI, etc.)
│   │   ├── data_processors.py                 # Common data processing
│   │   ├── validators.py                      # Input validation
│   │   └── formatters.py                      # Response formatting
│   ├── 📁 models/
│   │   ├── base_model.py                      # Base model class
│   │   ├── user_profile.py                    # User profile model
│   │   └── content_model.py                   # Content model
│   └── 📁 config/
│       ├── ai_config.py                       # AI service configurations
│       ├── database_config.py                 # Database configurations
│       └── logging_config.py                  # Logging setup
│
├── 📁 data/                               # Data storage and processing
│   ├── 📁 datasets/
│   │   ├── sample_questions.json              # Sample MCQ data
│   │   ├── interview_questions.json           # Interview question bank
│   │   └── study_materials.json               # Study content data
│   ├── 📁 models/                             # Trained model storage
│   │   ├── focus_predictor.pkl                # Focus prediction model
│   │   ├── difficulty_classifier.pkl          # Difficulty classification
│   │   └── recommendation_model.pkl           # Recommendation model
│   └── 📁 preprocessing/
│       ├── data_cleaner.py                    # Clean and prepare data
│       ├── feature_extractor.py               # Extract features
│       └── data_validator.py                  # Validate data quality
│
├── 📁 notebooks/                          # Jupyter notebooks for experimentation
│   ├── data_exploration.ipynb                 # Explore datasets
│   ├── model_training.ipynb                   # Train ML models
│   ├── evaluation.ipynb                       # Evaluate model performance
│   └── experimentation.ipynb                  # Try new ideas
│
├── 📁 tests/                              # Test suites
│   ├── unit/
│   ├── integration/
│   └── performance/
│
├── 📁 deployment/                         # Deployment configurations
│   ├── docker-compose.yml                     # Multi-service deployment
│   ├── kubernetes/                            # K8s deployment files
│   └── monitoring/                            # Monitoring setup
│
├── 📁 docs/                               # Documentation
│   ├── api/                                   # API documentation
│   ├── models/                                # Model documentation
│   └── deployment/                            # Deployment guides
│
├── requirements.txt                           # Global requirements
├── setup.py                                   # Package setup
├── docker-compose.yml                         # Development environment
└── README.md                                  # This file
```

---

## 🚀 Core AI Features Implementation

### 1. 🎯 MCQ Generator (Beginner-Friendly)

#### Step 1: Basic Implementation
```python
# File: ai-ml/services/mcq-generator/src/services/mcq_service.py

import openai
import json
import random
from typing import List, Dict, Optional

class MCQGenerator:
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
        self.question_templates = self.load_templates()
    
    def generate_questions(self, 
                         topic: str, 
                         difficulty: str = "medium", 
                         count: int = 5,
                         content: Optional[str] = None) -> List[Dict]:
        """
        Generate MCQ questions for a given topic
        
        Args:
            topic: Subject topic (e.g., "Python Programming")
            difficulty: easy, medium, hard
            count: number of questions to generate
            content: optional content to base questions on
        
        Returns:
            List of question dictionaries
        """
        try:
            prompt = self.create_prompt(topic, difficulty, count, content)
            
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=2000
            )
            
            questions = self.parse_response(response.choices[0].message.content)
            return self.validate_questions(questions)
            
        except Exception as e:
            print(f"Error generating questions: {str(e)}")
            return self.get_fallback_questions(topic, count)
    
    def create_prompt(self, topic: str, difficulty: str, count: int, content: Optional[str]) -> str:
        base_prompt = f"""
        Create {count} multiple choice questions about {topic} at {difficulty} difficulty level.
        
        Requirements:
        - Each question should have 4 options (A, B, C, D)
        - Only one correct answer
        - Include brief explanation for the correct answer
        - Make questions practical and educational
        
        Format as JSON array:
        [
          {{
            "question": "Question text here?",
            "options": {{
              "A": "Option A",
              "B": "Option B", 
              "C": "Option C",
              "D": "Option D"
            }},
            "correct_answer": "A",
            "explanation": "Why this answer is correct",
            "difficulty": "{difficulty}",
            "topic": "{topic}"
          }}
        ]
        """
        
        if content:
            base_prompt += f"\n\nBase the questions on this content:\n{content[:1000]}..."
            
        return base_prompt
    
    def parse_response(self, response: str) -> List[Dict]:
        """Parse AI response and extract questions"""
        try:
            # Try to extract JSON from response
            start_idx = response.find('[')
            end_idx = response.rfind(']') + 1
            
            if start_idx != -1 and end_idx != -1:
                json_str = response[start_idx:end_idx]
                return json.loads(json_str)
            else:
                # Fallback parsing if JSON not found
                return self.manual_parse(response)
                
        except json.JSONDecodeError:
            return self.manual_parse(response)
    
    def validate_questions(self, questions: List[Dict]) -> List[Dict]:
        """Validate and clean generated questions"""
        validated = []
        
        for q in questions:
            if self.is_valid_question(q):
                validated.append(q)
            else:
                print(f"Invalid question filtered out: {q.get('question', 'Unknown')}")
        
        return validated
    
    def is_valid_question(self, question: Dict) -> bool:
        """Check if question has all required fields"""
        required_fields = ['question', 'options', 'correct_answer', 'explanation']
        
        # Check all required fields exist
        if not all(field in question for field in required_fields):
            return False
        
        # Check options format
        options = question.get('options', {})
        if not isinstance(options, dict) or len(options) != 4:
            return False
        
        # Check correct answer is valid
        correct = question.get('correct_answer')
        if correct not in options:
            return False
        
        return True
```

#### Step 2: Add Difficulty Adaptation
```python
class DifficultyAdapter:
    def __init__(self):
        self.user_performance = {}
    
    def adapt_difficulty(self, user_id: str, last_scores: List[float]) -> str:
        """
        Adapt question difficulty based on user performance
        
        Args:
            user_id: User identifier
            last_scores: List of recent quiz scores (0-100)
        
        Returns:
            Recommended difficulty level
        """
        if not last_scores:
            return "medium"  # Default
        
        avg_score = sum(last_scores) / len(last_scores)
        recent_trend = self.calculate_trend(last_scores)
        
        # Difficulty adaptation logic
        if avg_score >= 80 and recent_trend >= 0:
            return "hard"
        elif avg_score <= 50 or recent_trend < -10:
            return "easy"
        else:
            return "medium"
    
    def calculate_trend(self, scores: List[float]) -> float:
        """Calculate performance trend (positive = improving)"""
        if len(scores) < 2:
            return 0
        
        recent_avg = sum(scores[-3:]) / min(3, len(scores))
        earlier_avg = sum(scores[:-3]) / max(1, len(scores) - 3)
        
        return recent_avg - earlier_avg
```

### 2. 🎤 Interview Bot (Intermediate)

#### Step 1: Basic Interview Flow
```python
# File: ai-ml/services/interview-bot/src/services/interview_service.py

class InterviewBot:
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
        self.sessions = {}  # Store active sessions
    
    def start_interview(self, user_id: str, topic: str, difficulty: str = "medium") -> Dict:
        """Start a new interview session"""
        session_id = f"{user_id}_{int(time.time())}"
        
        session = {
            'session_id': session_id,
            'user_id': user_id,
            'topic': topic,
            'difficulty': difficulty,
            'questions': [],
            'current_question': 0,
            'score': 0,
            'feedback': []
        }
        
        # Generate first question
        first_question = self.generate_question(topic, difficulty)
        session['questions'].append(first_question)
        
        self.sessions[session_id] = session
        
        return {
            'session_id': session_id,
            'question': first_question,
            'question_number': 1,
            'total_questions': 10  # Default
        }
    
    def answer_question(self, session_id: str, answer: str) -> Dict:
        """Process user answer and provide next question"""
        session = self.sessions.get(session_id)
        if not session:
            return {'error': 'Session not found'}
        
        current_q = session['questions'][session['current_question']]
        
        # Evaluate the answer
        evaluation = self.evaluate_answer(current_q['question'], answer, current_q.get('expected_points', []))
        
        # Store feedback
        session['feedback'].append({
            'question': current_q['question'],
            'answer': answer,
            'score': evaluation['score'],
            'feedback': evaluation['feedback'],
            'improvements': evaluation['improvements']
        })
        
        session['score'] += evaluation['score']
        session['current_question'] += 1
        
        # Check if interview is complete
        if session['current_question'] >= len(session['questions']):
            if len(session['questions']) < 10:  # Generate more questions
                next_difficulty = self.adapt_difficulty(session['feedback'])
                next_question = self.generate_question(session['topic'], next_difficulty)
                session['questions'].append(next_question)
            else:
                return self.complete_interview(session_id)
        
        # Return next question
        next_q = session['questions'][session['current_question']]
        return {
            'session_id': session_id,
            'question': next_q,
            'feedback': evaluation['feedback'],
            'score': evaluation['score'],
            'question_number': session['current_question'] + 1,
            'total_questions': min(10, len(session['questions']))
        }
    
    def evaluate_answer(self, question: str, answer: str, expected_points: List[str]) -> Dict:
        """Evaluate user's answer using AI"""
        prompt = f"""
        Evaluate this interview answer:
        
        Question: {question}
        Answer: {answer}
        Expected key points: {', '.join(expected_points) if expected_points else 'General knowledge expected'}
        
        Provide evaluation in JSON format:
        {{
            "score": <0-10>,
            "feedback": "<positive feedback>",
            "improvements": "<specific suggestions>",
            "key_points_covered": ["<list of points mentioned>"],
            "missing_points": ["<list of points missed>"]
        }}
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3
            )
            
            evaluation = json.loads(response.choices[0].message.content)
            return evaluation
            
        except Exception as e:
            return {
                'score': 5,
                'feedback': 'Thank you for your response.',
                'improvements': 'Try to provide more detailed explanations.',
                'key_points_covered': [],
                'missing_points': []
            }
    
    def generate_question(self, topic: str, difficulty: str) -> Dict:
        """Generate interview question for given topic and difficulty"""
        prompt = f"""
        Generate an interview question for {topic} at {difficulty} difficulty level.
        
        The question should:
        - Be open-ended and thought-provoking
        - Allow for detailed responses
        - Test both knowledge and application
        - Be appropriate for a student interview
        
        Return in JSON format:
        {{
            "question": "<question text>",
            "type": "open-ended",
            "difficulty": "{difficulty}",
            "topic": "{topic}",
            "expected_points": ["<key point 1>", "<key point 2>", "<key point 3>"],
            "time_limit": <seconds>,
            "hints": ["<hint 1>", "<hint 2>"]
        }}
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            
            question = json.loads(response.choices[0].message.content)
            return question
            
        except Exception as e:
            return {
                'question': f"Tell me about {topic} and its applications.",
                'type': 'open-ended',
                'difficulty': difficulty,
                'topic': topic,
                'expected_points': ['Definition', 'Applications', 'Examples'],
                'time_limit': 300,
                'hints': ['Think about real-world examples', 'Consider both theory and practice']
            }
```

### 3. 🧮 Problem Solver (Advanced)

```python
# File: ai-ml/services/problem-solver/src/services/solver_service.py

class ProblemSolver:
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
        self.solvers = {
            'math': MathSolver(),
            'coding': CodingSolver(),
            'physics': PhysicsSolver(),
            'chemistry': ChemistrySolver()
        }
    
    def solve_problem(self, problem: str, subject: str = "auto") -> Dict:
        """
        Solve a given problem with step-by-step explanation
        
        Args:
            problem: The problem statement
            subject: Subject area (math, coding, physics, etc.)
        
        Returns:
            Dictionary with solution, steps, and explanation
        """
        # Auto-detect subject if not provided
        if subject == "auto":
            subject = self.detect_subject(problem)
        
        # Use specialized solver if available
        if subject in self.solvers:
            return self.solvers[subject].solve(problem)
        
        # Use general AI solver
        return self.general_solve(problem, subject)
    
    def detect_subject(self, problem: str) -> str:
        """Detect the subject area of the problem"""
        keywords = {
            'math': ['equation', 'solve', 'calculate', 'derivative', 'integral', 'algebra'],
            'coding': ['function', 'algorithm', 'code', 'program', 'debug', 'syntax'],
            'physics': ['velocity', 'acceleration', 'force', 'energy', 'wave', 'momentum'],
            'chemistry': ['molecule', 'reaction', 'bond', 'element', 'compound', 'pH']
        }
        
        problem_lower = problem.lower()
        scores = {}
        
        for subject, words in keywords.items():
            score = sum(1 for word in words if word in problem_lower)
            scores[subject] = score
        
        return max(scores.items(), key=lambda x: x[1])[0] if max(scores.values()) > 0 else 'general'
    
    def general_solve(self, problem: str, subject: str) -> Dict:
        """General problem solving using AI"""
        prompt = f"""
        Solve this {subject} problem step by step:
        
        Problem: {problem}
        
        Provide a detailed solution in JSON format:
        {{
            "problem": "{problem}",
            "subject": "{subject}",
            "solution": "<final answer>",
            "steps": [
                {{
                    "step_number": 1,
                    "description": "<what we're doing in this step>",
                    "calculation": "<mathematical expression or logical step>",
                    "result": "<result of this step>"
                }}
            ],
            "explanation": "<overall explanation of the approach>",