import React, { useState, useCallback, memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { BookmarkIcon, Zap, Maximize2, Plus, Link } from 'lucide-react';
import clsx from 'clsx';

interface NodeData {
  label: string;
  text: string;
  bookmark?: boolean;
  isSelected?: boolean;
  isLoading?: boolean;
  truncateLength?: number;
  onEdit: (nodeId: string, text: string) => void;
  onGenerate: (nodeId: string) => void;
  onDetailClick: (nodeId: string) => void;
  onAddChild: (nodeId: string) => void;
  onReconnect?: (nodeId: string) => void;
}

export const EditableNode = memo(({ id, data, selected }: NodeProps<NodeData>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(data.text);

  const handleDoubleClick = useCallback(() => {
    if (data.isLoading) return;
    setIsEditing(true);
    setEditText(data.text);
  }, [data.text, data.isLoading]);

  const handleSave = useCallback(() => {
    if (editText.trim() !== data.text) {
      data.onEdit(id, editText);
    }
    setIsEditing(false);
  }, [id, editText, data]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && e.shiftKey) {
        return;
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSave();
        setTimeout(() => {
          data.onGenerate(id);
        }, 100);
      } else if (e.key === 'Escape') {
        setEditText(data.text);
        setIsEditing(false);
      }
    },
    [handleSave, id, data]
  );

  const handleGenerateClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      data.onGenerate(id);
    },
    [id, data]
  );

  const handleDetailClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      data.onDetailClick(id);
    },
    [id, data]
  );

  const handleAddChildClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      data.onAddChild(id);
    },
    [id, data]
  );

  const handleReconnectClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (data.onReconnect) {
        data.onReconnect(id);
      }
    },
    [id, data]
  );

  const truncateText = (text: string) => {
    const maxLength = data.truncateLength || 150;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      className={clsx(
        'px-5 py-4 rounded-2xl transition-all duration-300 min-w-[220px] max-w-[320px]',
        'relative overflow-hidden',
        // Skeuomorphic style with multiple shadows
        'shadow-[0_2px_4px_rgba(120,80,40,0.08),0_4px_12px_rgba(120,80,40,0.12),0_8px_20px_rgba(120,80,40,0.06),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(120,80,40,0.1)]',
        'dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]',
        // Borders and backgrounds
        selected
          ? 'border-[3px] border-primary bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-50 dark:from-amber-900/40 dark:via-yellow-900/30 dark:to-orange-900/40 animate-float'
          : data.isLoading
          ? 'border-[3px] border-blue-400 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/30 animate-pulse'
          : data.bookmark
          ? 'border-[2px] border-amber-400 bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/40 dark:via-yellow-900/40 dark:to-orange-900/40'
          : 'border-[2px] border-amber-200/60 dark:border-amber-900/40 bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50/30 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-orange-950/30',
        // Vintage paper texture
        'before:absolute before:inset-0 before:opacity-[0.04] before:bg-[url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence baseFrequency=\'1.2\' numOctaves=\'3\' seed=\'2\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")] before:rounded-2xl before:pointer-events-none',
        // Hover and interactivity
        'hover:shadow-[0_4px_8px_rgba(120,80,40,0.15),0_8px_24px_rgba(120,80,40,0.18),0_12px_32px_rgba(120,80,40,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]',
        'hover:-translate-y-1 hover:scale-[1.03]',
        'active:scale-[0.97] active:shadow-[inset_0_2px_8px_rgba(120,80,40,0.2)]',
        // Subtle glow
        data.isLoading && 'animate-glow',
        selected && 'ring-4 ring-primary/30 ring-offset-2 ring-offset-background'
      )}
      onDoubleClick={handleDoubleClick}
      style={{
        background: selected
          ? 'linear-gradient(135deg, rgba(251,191,36,0.25) 0%, rgba(245,158,11,0.15) 50%, rgba(251,146,60,0.2) 100%)'
          : data.isLoading
          ? 'linear-gradient(135deg, rgba(147,197,253,0.3) 0%, rgba(165,180,252,0.3) 50%, rgba(196,181,253,0.3) 100%)'
          : data.bookmark
          ? 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(253,224,71,0.15) 50%, rgba(249,115,22,0.15) 100%)'
          : 'linear-gradient(135deg, rgba(254,252,232,0.8) 0%, rgba(254,243,199,0.6) 50%, rgba(253,230,138,0.4) 100%)',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-primary border-2 border-background shadow-md"
      />

      <div className="flex items-start gap-3 relative z-10">
        <div className="flex-1">
          {isEditing ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              autoFocus
              className="w-full p-3 text-sm bg-white/60 dark:bg-black/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-inner backdrop-blur-sm"
              rows={3}
              placeholder="Type text... (Enter to save and generate)"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif"
              }}
            />
          ) : (
            <div className="text-sm break-words leading-relaxed" style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: 'hsl(30, 25%, 25%)',
            }}>
              {data.isLoading ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-3 bg-blue-300/60 dark:bg-blue-600/40 rounded w-full"></div>
                  <div className="h-3 bg-blue-300/60 dark:bg-blue-600/40 rounded w-5/6"></div>
                  <div className="h-3 bg-blue-300/60 dark:bg-blue-600/40 rounded w-4/6"></div>
                </div>
              ) : (
                <span className="text-foreground">
                  {truncateText(data.text || '(empty - double-click to edit)')}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {data.bookmark && (
            <div className="p-1.5 bg-amber-400/30 dark:bg-amber-600/30 rounded-lg shadow-sm">
              <BookmarkIcon size={16} className="text-amber-600 dark:text-amber-400" fill="currentColor" />
            </div>
          )}
          {!isEditing && !data.isLoading && data.text && data.text.length > (data.truncateLength || 150) && (
            <button
              onClick={handleDetailClick}
              className="p-1.5 hover:bg-amber-200/50 dark:hover:bg-amber-800/50 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              title="View full text"
            >
              <Maximize2 size={14} className="text-amber-700 dark:text-amber-400" />
            </button>
          )}
          {selected && !isEditing && !data.isLoading && (
            <>
              <button
                onClick={handleAddChildClick}
                className="p-1.5 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                title="Add child node manually"
              >
                <Plus size={16} className="text-green-600 dark:text-green-400" />
              </button>
              {data.onReconnect && (
                <button
                  onClick={handleReconnectClick}
                  className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                  title="Reconnect node (change parent)"
                >
                  <Link size={16} className="text-blue-600 dark:text-blue-400" />
                </button>
              )}
              <button
                onClick={handleGenerateClick}
                className="p-1.5 bg-primary/20 hover:bg-primary/30 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 animate-pop"
                title="Generate continuations (or press Enter when editing)"
              >
                <Zap size={16} className="text-primary" fill="currentColor" />
              </button>
            </>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-primary border-2 border-background shadow-md"
      />
    </div>
  );
});

EditableNode.displayName = 'EditableNode';
