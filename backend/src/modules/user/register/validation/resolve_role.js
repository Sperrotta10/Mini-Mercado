import zod from 'zod';

const validateRole = zod.object({
    role: zod.enum(['empleado'])
})

export function roleValidation(role) {
    
    return validateRole.safeParse({role})
}