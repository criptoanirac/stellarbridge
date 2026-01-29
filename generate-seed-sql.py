#!/usr/bin/env python3
"""
Gera SQL para popular o banco de dados com dados fictícios realistas
"""
import random
import json
from faker import Faker
from datetime import datetime, timedelta

fake = Faker('pt_BR')

# Configurações
NUM_TALENTS = 30
NUM_COMPANIES = 15
NUM_JOBS = 40

# Listas de dados realistas
TECH_SKILLS = [
    "React", "Node.js", "TypeScript", "Python", "Java", "JavaScript", "AWS", "Docker",
    "Kubernetes", "PostgreSQL", "MongoDB", "Git", "CI/CD", "Agile", "Scrum",
    "Vue.js", "Angular", "Django", "Flask", "Spring Boot", "GraphQL", "REST API",
    "Machine Learning", "TensorFlow", "PyTorch", "Data Analysis", "SQL", "NoSQL",
    "Microservices", "Redis", "Elasticsearch", "RabbitMQ", "Kafka"
]

DESIGN_SKILLS = [
    "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "UI Design",
    "UX Research", "Prototyping", "Design Systems", "Wireframing", "User Testing",
    "Information Architecture", "Interaction Design", "Visual Design", "Branding"
]

ROLES = [
    "Desenvolvedora Full Stack", "Designer UI/UX", "Cientista de Dados",
    "Engenheira de Software", "Product Manager", "DevOps Engineer",
    "Mobile Developer", "Backend Developer", "Frontend Developer",
    "Data Engineer", "QA Engineer", "Scrum Master", "Tech Lead",
    "Security Engineer", "Cloud Architect", "Business Analyst"
]

INDUSTRIES = ["Tecnologia", "Design", "Dados", "Gestão", "Produto", "Segurança"]

CITIES = [
    "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG",
    "Curitiba, PR", "Porto Alegre, RS", "Brasília, DF",
    "Florianópolis, SC", "Recife, PE", "Salvador, BA", "Fortaleza, CE"
]

CERTIFICATIONS = [
    ("AWS Certified Solutions Architect", "Amazon Web Services"),
    ("Professional Scrum Master", "Scrum.org"),
    ("Google UX Design Certificate", "Google"),
    ("Microsoft Azure Fundamentals", "Microsoft"),
    ("Certified Kubernetes Administrator", "CNCF"),
    ("PMP - Project Management Professional", "PMI"),
    ("Certified Ethical Hacker", "EC-Council"),
]

COURSES = [
    "Ciência da Computação", "Engenharia de Software", "Design Digital",
    "Sistemas de Informação", "Análise e Desenvolvimento de Sistemas",
    "Engenharia da Computação", "Design Gráfico", "Gestão de TI"
]

UNIVERSITIES = [
    "Universidade de São Paulo", "Universidade Federal do Rio de Janeiro",
    "Universidade Estadual de Campinas", "Universidade Federal de Minas Gerais",
    "Pontifícia Universidade Católica", "Universidade Federal do Rio Grande do Sul"
]

COMPANY_TYPES = [
    ("TechVision", "Tecnologia", "201-500"),
    ("InovaSoft", "Software", "51-200"),
    ("DesignHub", "Design", "11-50"),
    ("DataCore", "Dados e Analytics", "51-200"),
    ("CloudFirst", "Cloud Computing", "101-200"),
    ("FinTech Brasil", "Fintech", "501-1000"),
    ("EduTech", "Educação", "201-500"),
    ("HealthTech", "Saúde", "101-200"),
    ("RetailTech", "Varejo", "51-200"),
    ("AgriTech", "Agronegócio", "101-200"),
]

def generate_talents_sql():
    """Gera SQL para inserir talentos"""
    sql_lines = []
    
    for i in range(1, NUM_TALENTS + 1):
        role = random.choice(ROLES)
        industry = random.choice(INDUSTRIES)
        location = random.choice(CITIES)
        years_exp = random.randint(1, 12)
        xp = random.randint(50, 600)
        level = min(6, (xp // 100) + 1)
        birth_date = fake.date_of_birth(minimum_age=22, maximum_age=45).strftime('%Y-%m-%d')
        
        bio = f"{role} com {years_exp} anos de experiência. {fake.catch_phrase()}."
        
        sql = f"""INSERT INTO talents (userId, pseudonym, bio, currentRole, yearsExperience, industry, location, birthDate, identityVerified, xp, level)
VALUES ({i}, 'Talent-{i:03d}', '{bio}', '{role}', {years_exp}, '{industry}', '{location}', '{birth_date}', 1, {xp}, {level});"""
        sql_lines.append(sql)
    
    return "\n".join(sql_lines)

def generate_skills_sql():
    """Gera SQL para inserir skills"""
    sql_lines = []
    proficiency_levels = ["beginner", "intermediate", "advanced", "expert"]
    
    for talent_id in range(1, NUM_TALENTS + 1):
        # Cada talento tem 3-7 skills
        num_skills = random.randint(3, 7)
        
        # Escolhe skills baseado na indústria
        if talent_id % 3 == 0:  # Design
            skills_pool = DESIGN_SKILLS
        else:  # Tech
            skills_pool = TECH_SKILLS
        
        selected_skills = random.sample(skills_pool, min(num_skills, len(skills_pool)))
        
        for skill in selected_skills:
            proficiency = random.choice(proficiency_levels)
            # Escape single quotes
            skill_escaped = skill.replace("'", "''")
            sql = f"INSERT INTO talentSkills (talentId, skill, proficiency) VALUES ({talent_id}, '{skill_escaped}', '{proficiency}');"
            sql_lines.append(sql)
    
    return "\n".join(sql_lines)

def generate_education_sql():
    """Gera SQL para inserir educação"""
    sql_lines = []
    
    for talent_id in range(1, NUM_TALENTS + 1):
        university = random.choice(UNIVERSITIES)
        course = random.choice(COURSES)
        completion_year = random.randint(2010, 2023)
        
        sql = f"INSERT INTO talentEducation (talentId, institution, course, completionYear) VALUES ({talent_id}, '{university}', '{course}', {completion_year});"
        sql_lines.append(sql)
    
    return "\n".join(sql_lines)

def generate_certifications_sql():
    """Gera SQL para inserir certificações"""
    sql_lines = []
    
    for talent_id in range(1, min(NUM_TALENTS, 25) + 1):
        cert, issuer = random.choice(CERTIFICATIONS)
        issue_date = (datetime.now() - timedelta(days=random.randint(30, 730))).strftime('%Y-%m-%d')
        
        sql = f"INSERT INTO talentCertifications (talentId, certification, issuer, issueDate) VALUES ({talent_id}, '{cert}', '{issuer}', '{issue_date}');"
        sql_lines.append(sql)
    
    return "\n".join(sql_lines)

def generate_companies_sql():
    """Gera SQL para inserir empresas"""
    sql_lines = []
    
    for i in range(1, NUM_COMPANIES + 1):
        name_prefix, industry, size = random.choice(COMPANY_TYPES)
        company_name = f"{name_prefix} {fake.company_suffix()}"
        location = random.choice(CITIES)
        description = f"{fake.catch_phrase()}. {fake.bs().capitalize()}."
        
        sql = f"""INSERT INTO companies (userId, name, sector, size, location, website, description)
VALUES ({100 + i}, '{company_name}', '{industry}', '{size}', '{location}', 'https://{name_prefix.lower()}.com.br', '{description}');"""
        sql_lines.append(sql)
    
    return "\n".join(sql_lines)

def generate_jobs_sql():
    """Gera SQL para inserir vagas"""
    sql_lines = []
    
    job_titles = [
        "Desenvolvedora Full Stack Sênior", "Designer UI/UX Pleno", "Engenheira de Software Backend",
        "Product Designer Senior", "Cientista de Dados", "DevOps Engineer",
        "Desenvolvedora Mobile React Native", "Tech Lead Frontend", "Product Manager",
        "Engenheira de Machine Learning", "Desenvolvedora Backend Python", "Engenheira de Dados",
        "Game Developer Unity", "Security Engineer", "AI Research Engineer",
        "iOS Developer", "Scrum Master", "Arquiteta de Soluções Cloud",
        "QA Engineer", "UX Researcher", "Analista de BI",
        "Site Reliability Engineer", "Android Developer", "Content Designer",
        "Blockchain Developer", "Growth Hacker", "Business Analyst",
        "Motion Designer", "Penetration Tester", "NLP Engineer",
        "Flutter Developer", "Agile Coach", "Desenvolvedora Frontend Vue.js",
        "Graphic Designer", "Interaction Designer", "Data Analyst",
        "Cloud Architect", "Desenvolvedora Júnior Full Stack", "Instructional Designer",
        "Computer Vision Engineer"
    ]
    
    for i, title in enumerate(job_titles[:NUM_JOBS], 1):
        company_id = ((i - 1) % NUM_COMPANIES) + 1
        salary_min = random.randint(4000, 16000)
        salary_max = salary_min + random.randint(3000, 8000)
        location = random.choice(CITIES) + " - " + random.choice(["Remoto", "Híbrido", "Presencial"])
        
        description = f"Oportunidade para {title.lower()}. {fake.catch_phrase()}. {fake.bs().capitalize()}."
        requirements = json.dumps(random.sample(TECH_SKILLS if i % 3 != 0 else DESIGN_SKILLS, 4))
        
        sql = f"""INSERT INTO jobPostings (companyId, title, description, requirements, salaryMin, salaryMax, location, employmentType)
VALUES ({company_id}, '{title}', '{description}', '{requirements}', {salary_min}, {salary_max}, '{location}', 'Full-time');"""
        sql_lines.append(sql)
    
    return "\n".join(sql_lines)

def main():
    print("-- Dados Fictícios Realistas para StellarBridge")
    print("-- Gerado automaticamente\n")
    
    print("-- Talentos")
    print(generate_talents_sql())
    print()
    
    print("-- Skills")
    print(generate_skills_sql())
    print()
    
    print("-- Educação")
    print(generate_education_sql())
    print()
    
    print("-- Certificações")
    print(generate_certifications_sql())
    print()
    
    print("-- Empresas")
    print(generate_companies_sql())
    print()
    
    print("-- Vagas")
    print(generate_jobs_sql())

if __name__ == "__main__":
    main()
