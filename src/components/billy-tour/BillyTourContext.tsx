"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface BillyTourContextValue {
  isActive: boolean;
  currentStepIndex: number;
  startTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
  totalSteps: number;
}

const BillyTourContext = createContext<BillyTourContextValue | undefined>(undefined);

export function useBillyTour(): BillyTourContextValue {
  const context = useContext(BillyTourContext);
  if (!context) {
    throw new Error("useBillyTour must be used within a BillyTourProvider");
  }
  return context;
}

interface BillyTourContextProviderProps {
  children: React.ReactNode;
  totalSteps: number;
  onTourStart?: () => void;
  onTourEnd?: () => void;
  onStepChange?: (stepIndex: number) => void;
}

export function BillyTourContextProvider({
  children,
  totalSteps,
  onTourStart,
  onTourEnd,
  onStepChange
}: BillyTourContextProviderProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startTour = useCallback(() => {
    setCurrentStepIndex(0);
    setIsActive(true);
    onTourStart?.();
  }, [onTourStart]);

  const nextStep = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      onStepChange?.(newIndex);
    }
  }, [currentStepIndex, totalSteps, onStepChange]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1;
      setCurrentStepIndex(newIndex);
      onStepChange?.(newIndex);
    }
  }, [currentStepIndex, onStepChange]);

  const endTour = useCallback(() => {
    setIsActive(false);
    setCurrentStepIndex(0);
    onTourEnd?.();
  }, [onTourEnd]);

  const value: BillyTourContextValue = {
    isActive,
    currentStepIndex,
    startTour,
    nextStep,
    prevStep,
    endTour,
    totalSteps
  };

  return (
    <BillyTourContext.Provider value={value}>
      {children}
    </BillyTourContext.Provider>
  );
}

