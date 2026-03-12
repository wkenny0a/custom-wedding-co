'use client'

import { useState } from 'react'
import { Plus, Trash2, Users, Check, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

interface PartyRow {
    id: string
    fields: Record<string, string>
}

interface MultiItemBuilderProps {
    product: any
    perItemOptionNames: string[]
    sharedOptions: Record<string, string>
}

export function MultiItemBuilder({ product, perItemOptionNames, sharedOptions }: MultiItemBuilderProps) {
    const { addMultipleToCart } = useCart()
    const [isAdding, setIsAdding] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Get per-item option metadata from product.options for placeholders etc.
    const perItemOptionMeta = perItemOptionNames.map(name => {
        const opt = product.options?.find((o: any) => o.name === name)
        return {
            name,
            placeholder: opt?.description || `Enter ${name.toLowerCase()}`,
            required: opt?.required ?? true,
        }
    })

    // Initialize with 2 empty rows
    const createRow = (): PartyRow => ({
        id: Math.random().toString(36).slice(2, 9),
        fields: Object.fromEntries(perItemOptionNames.map(name => [name, '']))
    })

    const [rows, setRows] = useState<PartyRow[]>([createRow(), createRow()])

    const addRow = () => {
        setRows(prev => [...prev, createRow()])
    }

    const removeRow = (id: string) => {
        if (rows.length <= 1) return
        setRows(prev => prev.filter(r => r.id !== id))
    }

    const updateField = (id: string, fieldName: string, value: string) => {
        setRows(prev => prev.map(r =>
            r.id === id ? { ...r, fields: { ...r.fields, [fieldName]: value } } : r
        ))
    }

    // Check if all required per-item fields are filled
    const filledRows = rows.filter(row =>
        perItemOptionMeta.every(meta =>
            !meta.required || row.fields[meta.name]?.trim()
        )
    )

    const unitPrice = Number(product.price) || 0

    const handleAddAllToCart = async () => {
        if (filledRows.length === 0) return
        setIsAdding(true)

        try {
            const items = filledRows.map(row => {
                const options: any[] = []

                // Add shared options (variants + shared text fields)
                Object.entries(sharedOptions).forEach(([key, value]) => {
                    if (value) options.push({ name: key, value })
                })

                // Add per-item fields
                Object.entries(row.fields).forEach(([key, value]) => {
                    if (value?.trim()) options.push({ name: key, value: value.trim() })
                })

                return {
                    productId: product._id,
                    quantity: 1,
                    options,
                }
            })

            await addMultipleToCart(items)
            setIsSuccess(true)
            setTimeout(() => setIsSuccess(false), 3000)
        } catch (error) {
            console.error('Error adding party set to cart:', error)
            alert('Failed to add items to cart. Please try again.')
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <div className="border border-gold/30 bg-gradient-to-b from-cream/60 to-cream/30 overflow-hidden">
            {/* Header */}
            <div className="bg-espresso/5 border-b border-gold/20 px-5 py-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-gold" />
                </div>
                <div>
                    <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-espresso">
                        Build Your Party Set
                    </h3>
                    <p className="font-sans text-xs text-espresso/60 mt-0.5">
                        Add each person below — shared options above apply to all.
                    </p>
                </div>
            </div>

            {/* Rows */}
            <div className="p-4 sm:p-5 flex flex-col gap-3">
                {rows.map((row, index) => (
                    <div
                        key={row.id}
                        className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 border border-gold/20 bg-white hover:border-gold/40 transition-colors group"
                    >
                        {/* Row number */}
                        <span className="w-6 h-6 bg-espresso/5 text-espresso/60 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1.5 font-sans">
                            {index + 1}
                        </span>

                        {/* Fields */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {perItemOptionMeta.map(meta => (
                                <input
                                    key={meta.name}
                                    type="text"
                                    placeholder={meta.placeholder}
                                    value={row.fields[meta.name] || ''}
                                    onChange={(e) => updateField(row.id, meta.name, e.target.value)}
                                    className="w-full bg-transparent border border-gold/30 px-3 py-2.5 text-sm focus:outline-none focus:border-espresso transition-colors font-sans placeholder:text-gray-400"
                                />
                            ))}
                        </div>

                        {/* Delete */}
                        <button
                            onClick={() => removeRow(row.id)}
                            disabled={rows.length <= 1}
                            className="p-1.5 text-gray-300 hover:text-red-400 transition-colors disabled:opacity-0 disabled:cursor-default flex-shrink-0 mt-1.5"
                            title="Remove this item"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}

                {/* Add Row */}
                <button
                    onClick={addRow}
                    className="flex items-center justify-center gap-2 py-3 border border-dashed border-gold/30 text-espresso/60 hover:border-gold hover:text-gold transition-colors font-sans text-xs uppercase tracking-widest font-medium"
                >
                    <Plus size={14} />
                    Add Another Person
                </button>
            </div>

            {/* Footer — Summary + Action */}
            <div className="border-t border-gold/20 bg-espresso/[0.03] px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="font-sans text-sm text-espresso">
                    <span className="font-medium">{filledRows.length} {filledRows.length === 1 ? 'item' : 'items'}</span>
                    {unitPrice > 0 && (
                        <span className="text-espresso/60">
                            {' '}× ${unitPrice.toFixed(2)} = <span className="font-semibold text-gold">${(filledRows.length * unitPrice).toFixed(2)}</span>
                        </span>
                    )}
                </div>

                <button
                    onClick={handleAddAllToCart}
                    disabled={isAdding || filledRows.length === 0}
                    className={`
                        flex items-center gap-2 px-6 py-3 font-sans font-bold uppercase tracking-widest text-xs transition-all shadow-md hover:shadow-lg
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${isSuccess
                            ? 'bg-green-700 text-cream'
                            : 'bg-espresso text-cream hover:bg-espresso-light'
                        }
                    `}
                >
                    {isAdding ? (
                        <>
                            <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                            Adding {filledRows.length} Items...
                        </>
                    ) : isSuccess ? (
                        <>
                            <Check size={16} />
                            Added to Cart!
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={16} />
                            Add All {filledRows.length} to Cart
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
