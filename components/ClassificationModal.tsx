import React, { useState } from 'react';
import { X, Zap, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { AbnRecord } from '../types';
import { classifyBatch, countUnclassified } from '../services/industryClassification';
import { SBS_COLORS, headingStyle, bodyStyle, yellowButtonStyle } from '../config/branding';

interface ClassificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: AbnRecord[];
  onClassificationComplete: (updatedRecords: AbnRecord[]) => void;
}

enum ClassificationStatus {
  IDLE = 'IDLE',
  CLASSIFYING = 'CLASSIFYING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

const ClassificationModal: React.FC<ClassificationModalProps> = ({
  isOpen,
  onClose,
  records,
  onClassificationComplete
}) => {
  const [status, setStatus] = useState<ClassificationStatus>(ClassificationStatus.IDLE);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState<string>('');

  const unclassifiedCount = countUnclassified(records);

  const handleClassify = async () => {
    setStatus(ClassificationStatus.CLASSIFYING);
    setError('');

    try {
      const unclassified = records.filter(r => !r.industryCode || !r.classificationConfidence || r.classificationConfidence < 50);

      setProgress({ current: 0, total: unclassified.length });

      const results = await classifyBatch(unclassified, (current, total) => {
        setProgress({ current, total });
      });

      // Update records with classification results
      const updated = records.map(record => {
        const result = results.get(record.id);
        if (result && result.success) {
          console.log('✅ Classified:', record.entityName, '→', result.industryName, `(${result.confidence}%)`);
          return {
            ...record,
            industryCode: result.industryCode,
            industryName: result.industryName,
            industryGroup: result.industryGroup,
            classificationSource: 'AI' as const,
            classificationConfidence: result.confidence,
            classificationReason: result.reasoning,
            classificationDate: new Date().toISOString(),
            classificationReviewed: false
          };
        }
        return record;
      });

      console.log('📊 Classification Summary:', {
        total: records.length,
        classified: updated.filter(r => r.industryCode).length,
        sampleResult: updated.find(r => r.industryCode)
      });

      onClassificationComplete(updated);
      setStatus(ClassificationStatus.COMPLETE);

    } catch (err) {
      console.error('Classification error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setStatus(ClassificationStatus.ERROR);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" style={bodyStyle()}>
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center" style={{ borderColor: SBS_COLORS.gray200 }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: SBS_COLORS.popYellow }}>
              <Zap size={20} style={{ color: SBS_COLORS.darkBase }} />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={headingStyle()}>Industry Classification</h2>
              <p className="text-sm" style={{ color: SBS_COLORS.lightCharcoal }}>AI-powered categorization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={status === ClassificationStatus.CLASSIFYING}
          >
            <X size={20} style={{ color: SBS_COLORS.midCharcoal }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {status === ClassificationStatus.IDLE && (
            <>
              <div className="p-4 rounded-xl" style={{ backgroundColor: SBS_COLORS.lightYellow }}>
                <h3 className="font-bold mb-2" style={headingStyle()}>Ready to classify {unclassifiedCount.toLocaleString()} companies</h3>
                <p className="text-sm" style={{ color: SBS_COLORS.midCharcoal }}>
                  Uses Google Gemini AI to analyze company names and data, matching them to 238 industry categories.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5" style={{ color: SBS_COLORS.success }} />
                  <div>
                    <p className="font-semibold" style={headingStyle()}>Smart Classification</p>
                    <p className="text-sm" style={{ color: SBS_COLORS.midCharcoal }}>
                      Analyzes trading names, entity types, and charity status
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5" style={{ color: SBS_COLORS.success }} />
                  <div>
                    <p className="font-semibold" style={headingStyle()}>Confidence Scoring</p>
                    <p className="text-sm" style={{ color: SBS_COLORS.midCharcoal }}>
                      Each classification includes a confidence score (0-100%)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5" style={{ color: SBS_COLORS.success }} />
                  <div>
                    <p className="font-semibold" style={headingStyle()}>Low Cost</p>
                    <p className="text-sm" style={{ color: SBS_COLORS.midCharcoal }}>
                      ~$0.05 per 1,000 companies using Gemini Flash 2.0
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border" style={{ borderColor: SBS_COLORS.gray200, backgroundColor: SBS_COLORS.gray50 }}>
                <p className="text-xs" style={{ color: SBS_COLORS.midCharcoal }}>
                  <strong>Note:</strong> Classification will process {unclassifiedCount} companies at approximately 10 per second.
                  Already classified companies will be skipped.
                </p>
              </div>
            </>
          )}

          {status === ClassificationStatus.CLASSIFYING && (
            <div className="text-center py-8">
              <Loader2 size={48} className="mx-auto mb-4 animate-spin" style={{ color: SBS_COLORS.standardYellow }} />
              <h3 className="text-lg font-bold mb-2" style={headingStyle()}>Classifying Companies...</h3>
              <p className="text-sm mb-4" style={{ color: SBS_COLORS.midCharcoal }}>
                {progress.current} of {progress.total} completed
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${(progress.current / progress.total) * 100}%`,
                    background: `linear-gradient(135deg, ${SBS_COLORS.standardYellow} 0%, ${SBS_COLORS.popYellow} 100%)`
                  }}
                />
              </div>
            </div>
          )}

          {status === ClassificationStatus.COMPLETE && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: SBS_COLORS.lightYellow }}>
                <CheckCircle size={32} style={{ color: SBS_COLORS.success }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={headingStyle()}>Classification Complete!</h3>
              <p className="text-sm" style={{ color: SBS_COLORS.midCharcoal }}>
                Successfully classified {progress.total} companies
              </p>
            </div>
          )}

          {status === ClassificationStatus.ERROR && (
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#fee', borderColor: SBS_COLORS.error }}>
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="mt-0.5" style={{ color: SBS_COLORS.error }} />
                <div>
                  <p className="font-bold mb-1" style={{ color: SBS_COLORS.error }}>Classification Failed</p>
                  <p className="text-sm" style={{ color: SBS_COLORS.midCharcoal }}>{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: SBS_COLORS.gray200 }}>
          {(status === ClassificationStatus.IDLE || status === ClassificationStatus.ERROR) && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full font-medium transition-colors"
                style={{ color: SBS_COLORS.midCharcoal }}
              >
                Cancel
              </button>
              <button
                onClick={handleClassify}
                className="px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                style={yellowButtonStyle}
                disabled={unclassifiedCount === 0}
              >
                <span className="flex items-center gap-2">
                  <Zap size={18} />
                  Classify {unclassifiedCount} Companies
                </span>
              </button>
            </>
          )}

          {status === ClassificationStatus.COMPLETE && (
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              style={yellowButtonStyle}
            >
              Done
            </button>
          )}

          {status === ClassificationStatus.CLASSIFYING && (
            <button
              disabled
              className="px-6 py-2 rounded-full font-medium opacity-50 cursor-not-allowed"
              style={yellowButtonStyle}
            >
              Classifying...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassificationModal;
