$dirs = @(
    'c:\FItTrade\lms_frontend\src\app\pages',
    'c:\FItTrade\lms_frontend\src\app\components'
)

$replacements = @(
    @('bg-\[#0F172A\]',          'bg-[var(--ft-bg)]'),
    @('bg-\[#111827\]',          'bg-[var(--ft-surface)]'),
    @('bg-\[#1F2937\]',          'bg-[var(--ft-surface)]'),
    @('border-\[#334155\]',      'border-[var(--ft-border)]'),
    @('text-\[#E5E7EB\]',        'text-[var(--ft-charcoal)]'),
    @('text-\[#9CA3AF\]',        'text-[var(--ft-muted)]'),
    @('text-\[#00D1B2\]',        'text-[var(--ft-red)]'),
    @('bg-\[#00D1B2\]',          'bg-[var(--ft-red)]'),
    @('hover:bg-\[#00D1B2\]/90', 'hover:bg-[var(--ft-red-hover)]'),
    @('bg-\[#00D1B2\]/10',       'bg-[var(--ft-red-tint)]'),
    @('bg-\[#00D1B2\]/20',       'bg-[var(--ft-red-tint)]'),
    @('border-\[#00D1B2\]',      'border-[var(--ft-red)]'),
    @('border-\[#00D1B2\]/50',   'border-[var(--ft-red)]/50'),
    @('border-\[#00D1B2\]/20',   'border-[var(--ft-red)]/20'),
    @('text-\[#0F172A\]',        'text-white'),
    @('hover:bg-\[#1F2937\]',    'hover:bg-[var(--ft-surface)]'),
    @('hover:text-\[#E5E7EB\]',  'hover:text-[var(--ft-charcoal)]'),
    @('text-\[#10B981\]',        'text-[var(--ft-success)]'),
    @('bg-\[#10B981\]/10',       'bg-[var(--ft-success)]/10'),
    @('bg-\[#10B981\]',          'bg-[var(--ft-success)]'),
    @('text-\[#EF4444\]',        'text-[var(--ft-danger)]'),
    @('bg-\[#EF4444\]/10',       'bg-[var(--ft-danger)]/10'),
    @('border-\[#EF4444\]/20',   'border-[var(--ft-danger)]/20'),
    @('hover:bg-\[#EF4444\]/10', 'hover:bg-[var(--ft-danger)]/10'),
    @('bg-\[#3B82F6\]/10',       'bg-[var(--ft-red-tint)]'),
    @('text-\[#3B82F6\]',        'text-[var(--ft-red)]'),
    @('border-\[#3B82F6\]',      'border-[var(--ft-red)]'),
    @('border-l-\[#00D1B2\]',    'border-l-[var(--ft-red)]'),
    @('hover:border-\[#00D1B2\]','hover:border-[var(--ft-red)]'),
    @('text-red-500',             'text-[var(--ft-danger)]'),
    @('bg-red-500/10',            'bg-[var(--ft-danger)]/10'),
    @('border-red-500/20',        'border-[var(--ft-danger)]/20'),
    @('font-bold',                'font-medium')
)

$count = 0
foreach ($dir in $dirs) {
    $files = Get-ChildItem -Path "$dir\*.tsx" -File
    foreach ($file in $files) {
        $content = Get-Content $file.FullName -Raw
        $original = $content
        foreach ($r in $replacements) {
            $content = $content -replace [regex]::Escape($r[0]).Replace('\\\[', '\[').Replace('\\\]', '\]'), $r[1]
        }
        # Simple string replace for remaining patterns
        $content = $content.Replace('bg-[#0F172A]', 'bg-[var(--ft-bg)]')
        $content = $content.Replace('bg-[#111827]', 'bg-[var(--ft-surface)]')
        $content = $content.Replace('bg-[#1F2937]', 'bg-[var(--ft-surface)]')
        $content = $content.Replace('border-[#334155]', 'border-[var(--ft-border)]')
        $content = $content.Replace('text-[#E5E7EB]', 'text-[var(--ft-charcoal)]')
        $content = $content.Replace('text-[#9CA3AF]', 'text-[var(--ft-muted)]')
        $content = $content.Replace('text-[#00D1B2]', 'text-[var(--ft-red)]')
        $content = $content.Replace('bg-[#00D1B2]', 'bg-[var(--ft-red)]')
        $content = $content.Replace('hover:bg-[#00D1B2]/90', 'hover:bg-[var(--ft-red-hover)]')
        $content = $content.Replace('bg-[#00D1B2]/10', 'bg-[var(--ft-red-tint)]')
        $content = $content.Replace('bg-[#00D1B2]/20', 'bg-[var(--ft-red-tint)]')
        $content = $content.Replace('border-[#00D1B2]', 'border-[var(--ft-red)]')
        $content = $content.Replace('border-[#00D1B2]/50', 'border-[var(--ft-red)]/50')
        $content = $content.Replace('border-[#00D1B2]/20', 'border-[var(--ft-red)]/20')
        $content = $content.Replace('text-[#0F172A]', 'text-white')
        $content = $content.Replace('hover:bg-[#1F2937]', 'hover:bg-[var(--ft-surface)]')
        $content = $content.Replace('hover:text-[#E5E7EB]', 'hover:text-[var(--ft-charcoal)]')
        $content = $content.Replace('text-[#10B981]', 'text-[var(--ft-success)]')
        $content = $content.Replace('bg-[#10B981]/10', 'bg-[var(--ft-success)]/10')
        $content = $content.Replace('bg-[#10B981]', 'bg-[var(--ft-success)]')
        $content = $content.Replace('text-[#EF4444]', 'text-[var(--ft-danger)]')
        $content = $content.Replace('bg-[#EF4444]/10', 'bg-[var(--ft-danger)]/10')
        $content = $content.Replace('border-[#EF4444]/20', 'border-[var(--ft-danger)]/20')
        $content = $content.Replace('hover:bg-[#EF4444]/10', 'hover:bg-[var(--ft-danger)]/10')
        $content = $content.Replace('bg-[#3B82F6]/10', 'bg-[var(--ft-red-tint)]')
        $content = $content.Replace('text-[#3B82F6]', 'text-[var(--ft-red)]')
        $content = $content.Replace('border-[#3B82F6]', 'border-[var(--ft-red)]')
        $content = $content.Replace('border-l-[#00D1B2]', 'border-l-[var(--ft-red)]')
        $content = $content.Replace('hover:border-[#00D1B2]', 'hover:border-[var(--ft-red)]')
        $content = $content.Replace('text-red-500', 'text-[var(--ft-danger)]')
        $content = $content.Replace('bg-red-500/10', 'bg-[var(--ft-danger)]/10')
        $content = $content.Replace('border-red-500/20', 'border-[var(--ft-danger)]/20')
        $content = $content.Replace('font-bold', 'font-medium')
        # Additional hex patterns
        $content = $content.Replace('#00D1B2', 'var(--ft-red)')
        $content = $content.Replace('#0F172A', 'var(--ft-bg)')
        $content = $content.Replace('#111827', 'var(--ft-surface)')
        $content = $content.Replace('#1F2937', 'var(--ft-surface)')
        $content = $content.Replace('#334155', 'var(--ft-border)')
        $content = $content.Replace('#E5E7EB', 'var(--ft-charcoal)')
        $content = $content.Replace('#9CA3AF', 'var(--ft-muted)')
        $content = $content.Replace('#10B981', 'var(--ft-success)')
        $content = $content.Replace('#EF4444', 'var(--ft-danger)')
        $content = $content.Replace('#3B82F6', 'var(--ft-red)')

        if ($content -ne $original) {
            Set-Content -Path $file.FullName -Value $content -NoNewline
            $count++
            Write-Output "Updated: $($file.Name)"
        } else {
            Write-Output "No changes: $($file.Name)"
        }
    }
}
Write-Output "`nTotal files updated: $count"
