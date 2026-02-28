# **QURA**

## _SAY NO TO QUEUE_

Born from “Queue” and “Cura,” the Italian word for healing, Qura represents a future where healthcare flows seamlessly and every patient receives timely attention.


## 1. Problem Statement
###  Problem Title

Inefficient and Static Patient Queue Management in Small & Mid-Sized Clinics


###  Problem Description

Small and mid-sized clinics are the backbone of primary healthcare, especially in densely populated regions. However, unlike large hospitals, most clinics still rely on manual appointment books, spreadsheets, or first-come-first-serve systems to manage patient flow.

In real-world clinical environments:

  - Patient inflow is unpredictable

  - Walk-ins disrupt scheduled appointments

  - No-shows and cancellations create idle gaps

  - Emergency cases require immediate attention

  - Consultation durations vary significantly

  - Static scheduling systems fail to adapt to these real-time variables. As a result:

  - Waiting rooms become overcrowded

  - Doctors experience schedule overruns

  - Patients face long and uncertain wait times

  - Staff struggle with manual rescheduling

The current system is non-adaptive, inefficient, and does not optimize consultation time or patient prioritization.


###  Target Users

 Small and mid-sized clinics

   Doctors managing high patient inflow

   Clinic administrative staff

   Patients seeking faster and predictable consultations


###  Existing Gaps

Current clinic scheduling systems suffer from the following gaps:

  - Fixed appointment slots without real-time adjustment

  - No dynamic prioritization for urgent cases

  - No intelligent modeling of consultation duration

  - Poor handling of walk-ins and emergency cases

  - Manual queue reshuffling during peak hours

  - Inefficient utilization of doctor availability

  - Lack of workload balancing across doctors

These gaps lead to excessive waiting times, operational stress, reduced patient satisfaction, and underutilized clinical efficiency.



# 2. Problem Understanding & Approach

## Problem Understanding

Small and mid-sized clinics operate in highly variable environments where:

* Patient inflow is unpredictable
* Consultation times vary significantly
* Walk-ins and emergencies disrupt schedules
* No-shows create idle gaps
* Manual systems fail to adapt in real time

Current scheduling is **static**, while real-world healthcare demand is **dynamic**.


## Root Cause Analysis

The inefficiency stems from:

1. **Fixed time-slot systems** that ignore variability in consultation duration
2. **No real-time rescheduling mechanism**
3. **Lack of triage-based prioritization**
4. **No modeling of doctor workload or fatigue**
5. **Manual queue adjustments**, causing chaos during peak hours

At its core, clinics lack a **dynamic optimization engine** for patient flow.


## Solution Strategy

Design an **AI-driven, real-time Patient Queue Optimization System** that:

* Predicts consultation duration dynamically
* Allocates adaptive time slots
* Rebalances schedules automatically
* Prioritizes patients using urgency scoring
* Minimizes idle time and waiting time simultaneously

The strategy combines:

* Predictive modeling
* Real-time event handling
* Automated queue rebalancing
* Human-in-the-loop control (receptionist override)



# 3. Proposed Solution

## Solution Overview

A **two-interface intelligent scheduling system** consisting of:

* **Patient UI (Web Portal)**
* **Receptionist UI (Control Dashboard)**
* AI-powered backend optimization engine

The system continuously recalculates optimal scheduling based on real-time clinic conditions.


## Core Idea

Instead of fixed appointments, the system treats scheduling as a **live optimization problem**.

It dynamically adjusts based on:

* Estimated consultation duration
* Walk-ins
* Emergencies
* Early completions
* No-shows
* Delays

Goal:
**Maximize doctor utilization while minimizing patient waiting time.**


## Key Features

###  Patient UI

* Online appointment booking
* Input: name, symptoms, preferred time, estimated consultation duration
* Real-time slot allocation
* Live updates:

  * Delay notifications
  * Early arrival alerts (due to cancellations)
  * Slot shifts in case of emergencies
* Personal dashboard with updated queue position


###  Receptionist UI

* View AI-suggested optimized schedule
* Confirm or override appointments
* Add walk-ins manually
* Log emergency cases (auto-prioritized)
* Trigger automatic rebalancing of subsequent slots
* View real-time doctor workload and schedule impact


###  AI Backend Engine

* Predicts consultation time based on:

  * Case type
  * Historical patterns
  * Doctor-specific averages

* Dynamically:

  * Reallocates time
  * Utilizes freed time (early completion cases)
  * Shifts schedule intelligently during emergencies
  * Minimizes cascading delays


###  Smart Time Utilization

If a 60-minute slot finishes in 35 minutes:

* Remaining time is dynamically reassigned to:

  * Emergency cases
  * Waiting walk-ins
  * Advancing the next scheduled patient

No idle clinical time.


###  Real-Time Adaptive Notifications

Patients receive updates similar to delivery platforms (Blinkit/Zepto style):

* “Doctor running 10 mins late”
* “You may arrive 15 mins early due to cancellation”
* “Emergency case added — new expected consultation time: 3:40 PM”


### Impact

* Reduced waiting time
* Higher patient satisfaction
* Reduced doctor fatigue
* Increased patients treated per day
* Better emergency handling
* Optimized clinic revenue



# 4. System Architecture

##  High-Level Flow

```
User (Patient / Receptionist)
        ↓
Frontend (Web App)
        ↓
Backend API Server
        ↓
AI Optimization Model
        ↓
Database
        ↓
Response → Frontend → User
```

Expanded Real-Time Flow:

```
Patient submits request
        ↓
Frontend sends API call
        ↓
Backend validates + processes request
        ↓
Model estimates consultation time & optimizes queue
        ↓
Database updates schedule
        ↓
Backend sends updated slot + notifications
        ↓
Frontend displays real-time status
```


# 2. Architecture Description

##  1. Frontend Layer

**Tech Example:** React.js/ Basic HTML/ CSS/ JS

Two Interfaces:

* Patient Portal
* Receptionist Dashboard

Responsibilities:

* Collect patient details
* Show real-time queue status
* Display delay updates
* Allow receptionist override

Communicates with backend via REST APIs / WebSockets.


##  2. Backend Layer

**Tech Example:**  Python (FastAPI)

Responsibilities:

* API handling
* Authentication
* Business logic
* Queue state management
* Emergency override logic
* Trigger AI optimization

Acts as the orchestration layer between frontend, model, and database.


##  3. AI Optimization Model

Core Intelligence Layer.

Functions:

* Predict consultation duration
* Assign triage urgency score
* Optimize queue dynamically
* Rebalance slots in real time
* Minimize waiting time + idle time

Possible Techniques:

* Regression model for time prediction
* Priority Queue + scheduling algorithm
* Reinforcement Learning (advanced version)


##  4. Database Layer

**Tech Example:** PostgreSQL

Stores:

* Patient data
* Appointment records
* Doctor schedules
* Historical consultation times
* Triage scores
* Real-time queue state

Supports:

* Real-time updates
* Audit logs
* Analytics


##  5. Real-Time Communication Layer

**Socket.io**

Used for:

* Live delay updates
* Slot shifts
* Cancellation alerts
* Emergency-triggered updates


# 3. Architecture Diagram

###  Text-Based Diagram

```
                    ┌─────────────────────┐
                    │      Users          │
                    │ (Patient / Receptionist)
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Frontend        │
                    │  (React Web App)    │
                    └──────────┬──────────┘
                               │ REST 
                               ▼
                    ┌─────────────────────┐
                    │      Backend        │
                    │  (API + Scheduler)  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  AI Optimization    │
                    │   Engine / Model    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Database       │
                    │ (Appointments Data) │
                    └──────────┬──────────┘
                               │
                               ▼
                    Real-Time Response & Notifications
```
